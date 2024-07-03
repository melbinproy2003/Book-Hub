from rest_framework.authentication import TokenAuthentication
from django.contrib.auth import authenticate
from rest_framework import generics, status, permissions
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Book, User
from rest_framework.exceptions import PermissionDenied
from .serializers import UserSerializer, RegisterSerializer, BookSerializer
from django.contrib.auth import logout

@api_view(['POST'])
def login(request):
    try:
        username = request.data['username']
        password = request.data['password']
    except KeyError:
        return Response({'error': 'Please provide both username and password.'}, status=400)

    user = authenticate(username=username, password=password)
    if user:
        token, created = Token.objects.get_or_create(user=user)
        user_data = UserSerializer(user).data
        user_data['is_librarian'] = user.is_librarian  # Ensure this field is added
        return Response({'token': token.key, 'user': user_data})
    return Response({'error': 'Invalid Credentials'}, status=400)

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        token, created = Token.objects.get_or_create(user=user)
        return Response(
            {'token': token.key, 'user': UserSerializer(user).data},
            status=status.HTTP_201_CREATED,
            headers=headers
        )

    def perform_create(self, serializer):
        return serializer.save()

class UserListView(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(is_patron=True)
    
class UserDeleteView(generics.DestroyAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(is_patron=True)


class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)

class BookCreateView(generics.CreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def perform_create(self, serializer):
        if not self.request.user.is_librarian:
            raise PermissionDenied("Only librarians can add books.")
        serializer.save(added_by=self.request.user)

class BookListView(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookDetailView(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookUpdateView(generics.UpdateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def perform_update(self, serializer):
        if not self.request.user.is_librarian:
            raise PermissionDenied("Only librarians can update books.")
        serializer.save()

class BookDeleteView(generics.DestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def perform_destroy(self, instance):
        if not self.request.user.is_librarian:
            raise PermissionDenied("Only librarians can delete books.")
        instance.delete()
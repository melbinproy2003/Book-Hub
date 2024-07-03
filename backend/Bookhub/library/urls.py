from django.urls import path
from .views import login, RegisterView, LogoutView, BookCreateView, BookListView, BookDetailView, BookUpdateView,BookDeleteView, UserListView, UserDeleteView

urlpatterns = [
    path('login/', login, name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('books/add/', BookCreateView.as_view(), name='add_book'),
    path('books/', BookListView.as_view(), name='list_books'),
    path('users/', UserListView.as_view(), name='list_users'),
    path('users/<int:pk>/delete/', UserDeleteView.as_view(), name='list_users'),
    path('books/<int:pk>/', BookDetailView.as_view(), name='book_detail'),
    path('books/<int:pk>/update/', BookUpdateView.as_view(), name='book-update'),
    path('books/<int:pk>/delete/', BookDeleteView.as_view(), name='book-delete'),
]

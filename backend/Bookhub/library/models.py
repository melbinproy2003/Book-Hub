from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class User(AbstractUser):
    is_librarian = models.BooleanField(default=False)
    is_patron = models.BooleanField(default=True)

    groups = models.ManyToManyField(
        Group,
        related_name='library_user_set',  # Ensure this line is added
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_query_name='library_user',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='library_user_permissions_set',  # Ensure this line is added
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='library_user_permissions',
    )

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    isbn = models.CharField(max_length=13, unique=True)
    publish_date = models.DateField(null=True, blank=True)
    image = models.ImageField(null=True, upload_to='books/')
    summary = models.TextField()
    added_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='added_books')
    reserved_by = models.ForeignKey(User, related_name='reserved_books', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.title

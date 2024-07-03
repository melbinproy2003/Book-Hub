from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin
from .models import User, Book

@admin.register(User)
class UserAdmin(DefaultUserAdmin):
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser',
                                    'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
        ('Roles', {'fields': ('is_librarian', 'is_patron')}),
    )

    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_librarian', 'is_patron')
    search_fields = ('username', 'first_name', 'last_name', 'email')
    ordering = ('username',)

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'isbn', 'publish_date', 'added_by', 'reserved_by')
    search_fields = ('title', 'author', 'isbn')
    list_filter = ('publish_date', 'added_by', 'reserved_by')
    ordering = ('title',)

from rest_framework.permissions import BasePermission

from users.models import User


class IsManager(BasePermission):
    def has_object_permission(self, request, view, obj):
        return User.objects.filter(id=request.user.id and request.user.is_manager==True).exists()

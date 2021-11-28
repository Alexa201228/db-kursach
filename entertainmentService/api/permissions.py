from rest_framework.permissions import BasePermission


class IsManager(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.users.filter(id=request.user.id and request.user.is_manager==True).exists()

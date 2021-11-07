from rest_framework import serializers

from users.models import User


class RegisterUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'password']

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'birthday', 'profile_photo']
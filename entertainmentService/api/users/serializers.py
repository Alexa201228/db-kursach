from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from users.models import User


class RegisterUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'password', 'is_manager']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            validate_password(password, instance)
            instance.set_password(password)
            instance.save()
            return instance


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'birthday', 'profile_photo']
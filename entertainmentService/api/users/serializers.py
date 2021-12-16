from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from users.models import User
from user_stuff.models import UserGameStatistics, UserFilmStatistics, UserSeriesStatistics

class RegisterUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'password', 'is_manager']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        try:
            password = validated_data.pop('password', None)
            instance = self.Meta.model(**validated_data)
            if password is not None:
                validate_password(password, instance)
                instance.set_password(password)
                instance.save()
                if not validated_data.get('is_manager', None):
                    UserFilmStatistics.objects.create(user=instance)
                    UserSeriesStatistics.objects.create(user=instance)
                    UserGameStatistics.objects.create(user=instance)
                return instance
        except Exception as e:
            print(str(e))


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'birthday', 'profile_photo']
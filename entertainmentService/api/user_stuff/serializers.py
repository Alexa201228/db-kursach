from rest_framework import serializers

from user_stuff.models import Community, Subscription, UserGameStatistics,\
    UserFilmStatistics, UserSeriesStatistics, Comment
from api.users.serializers import UserSerializer


class CommunitySerializer(serializers.ModelSerializer):
    users = UserSerializer(read_only=True, many=True)

    class Meta:
        model = Community
        fields = '__all__'
        extra_kwargs = {'id': {'read_only': True}}


class UserGameStatisticsSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserGameStatistics
        fields = '__all__'
        extra_kwargs = {'id': {'read_only': True}}


class UserFilmStatisticsSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserFilmStatistics
        fields = '__all__'
        extra_kwargs = {'id': {'read_only': True}}


class UserSeriesStatisticsSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserSeriesStatistics
        fields = '__all__'
        extra_kwargs = {'id': {'read_only': True}}


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'
        extra_kwargs = {'id': {'read_only': True}}


class SubscriptionSerializer(serializers.ModelSerializer):
    users = UserSerializer(read_only=True, many=True)

    class Meta:
        model = Subscription
        fields = '__all__'
        extra_kwargs = {'id': {'read_only': True}}

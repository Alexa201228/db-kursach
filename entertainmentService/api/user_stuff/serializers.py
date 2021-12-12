from rest_framework import serializers

from user_stuff.models import Community, Subscription, UserGameStatistics,\
    UserFilmStatistics, UserSeriesStatistics, Comment
from api.users.serializers import UserSerializer
from api.services.serializers import ServiceSerializer


class CommunitySerializer(serializers.ModelSerializer):
    users = UserSerializer(required=False, many=True)

    class Meta:
        model = Community
        fields = '__all__'
        extra_kwargs = {'id': {'read_only': True}}


class UserGameStatisticsSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)

    class Meta:
        model = UserGameStatistics
        fields = '__all__'
        extra_kwargs = {'id': {'read_only': True}}


class UserFilmStatisticsSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)

    class Meta:
        model = UserFilmStatistics
        fields = '__all__'
        extra_kwargs = {'id': {'read_only': True}}


class UserSeriesStatisticsSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)

    class Meta:
        model = UserSeriesStatistics
        fields = '__all__'
        extra_kwargs = {'id': {'read_only': True}}


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)

    class Meta:
        model = Comment
        fields = '__all__'
        extra_kwargs = {'id': {'read_only': True}}


class SubscriptionSerializer(serializers.ModelSerializer):
    users = UserSerializer(read_only=True, many=True, required=False)
    services = ServiceSerializer(required=False, many=True)

    class Meta:
        model = Subscription
        fields = '__all__'
        extra_kwargs = {'id': {'read_only': True}}

    def update(self, instance, *args, **kwargs):

        validated_data = self.context['request'].data
        instance.title = validated_data['name']
        services = []

        for service in validated_data['services']:
            services.append(service['id'])
        instance.services.set(services)
        instance.duration = validated_data['duration']
        instance.save()
        return instance

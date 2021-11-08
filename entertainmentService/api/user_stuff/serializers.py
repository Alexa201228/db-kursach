from rest_framework import serializers

from user_stuff.models import Community, Subscription, UserGameStatistics,\
    UserFilmStatistics, UserSeriesStatistics, Comments
from api.users.serializers import UserSerializer
from api.films.serializers import FilmSerializer
from api.series.serializers import SeriesSerializer
from api.games.serializers import GameSerializer


class CommunitySerializer(serializers.ModelSerializer):
    users = UserSerializer(read_only=True, many=True)

    class Meta:
        model = Community
        fields = '__all__'
        extra_kwargs = {'id': {'read_only': True}}




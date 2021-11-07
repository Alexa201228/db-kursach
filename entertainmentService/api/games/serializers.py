from rest_framework import serializers

from games.models import Game
from api.films.serializers import GenreSerializer


class GameSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(read_only=True, many=True)

    class Meta:
        model = Game
        fields = '__all__'
        extra_kwargs = {'id': {'read_only': True}}

from rest_framework import serializers

from services.models import Service
from api.films.serializers import FilmSerializer
from api.games.serializers import GameSerializer
from api.series.serializers import SeriesSerializer


class ServiceSerializer(serializers.ModelSerializer):
    films = FilmSerializer(many=True)
    games = GameSerializer(many=True)
    series = SeriesSerializer(many=True)

    class Meta:
        model = Service
        fields = '__all__'
        extra_kwargs = {'id': {'read_only': True}}

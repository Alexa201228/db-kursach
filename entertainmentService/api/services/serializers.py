from rest_framework import serializers

from services.models import Service
from api.films.serializers import FilmSerializer
from api.games.serializers import GameSerializer
from api.series.serializers import SeriesSerializer


class ServiceSerializer(serializers.ModelSerializer):
    films = FilmSerializer(many=True, required=False)
    games = GameSerializer(many=True, required=False)
    series = SeriesSerializer(many=True, required=False)

    class Meta:
        model = Service
        fields = '__all__'

    def update(self, instance, *args, **kwargs):
        validated_data = self.context['request'].data
        instance.name = validated_data['name']
        films = []
        series = []
        games = []
        for film in validated_data['films']:
            films.append(film['id'])
        for serie in validated_data['series']:
            series.append(serie['id'])
        for game in validated_data['games']:
            games.append(game['id'])
        instance.films.set(films)
        instance.series.set(series)
        instance.games.set(games)
        instance.save()
        return instance

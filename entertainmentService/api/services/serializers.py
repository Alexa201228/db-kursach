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
        print('something')
        validated_data = self.context['request'].data
        print(self.context['request'])
        instance.name = validated_data['name']
        for film in validated_data['films']:
            if film not in instance.films.all():
                instance.films.add(film['id'])
        for serie in validated_data['series']:
            if serie not in instance.series.all():
                instance.films.add(serie.id)
        for game in validated_data['games']:
            if game not in instance.games.all():
                instance.films.add(game.id)

        instance.save()
        return instance

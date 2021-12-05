from rest_framework import serializers

from films.models import Film, Genre


class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = '__all__'


class FilmSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(required=False, many=True)

    class Meta:
        model = Film
        fields = '__all__'
        extra_kwargs = {'id': {'read_only': True}}

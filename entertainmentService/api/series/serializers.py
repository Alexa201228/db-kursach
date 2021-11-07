from rest_framework import serializers

from series.models import Series
from api.films.serializers import GenreSerializer


class SeriesSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(read_only=True, many=True)

    class Meta:
        model = Series
        fields = '__all__'
        
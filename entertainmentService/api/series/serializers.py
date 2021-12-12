from rest_framework import serializers

from series.models import Series
from users.models import Director
from api.films.serializers import GenreSerializer, DirectorSerializer, ActorSerializer
from api.companies.serializers import CompanySerializer


class SeriesSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, required=False)
    director = DirectorSerializer(required=False)
    actors = ActorSerializer(many=True, required=False)
    company = CompanySerializer(required=False, many=True)

    class Meta:
        model = Series
        fields = '__all__'


    def update(self, instance, *args, **kwargs):

        validated_data = self.context['request'].data
        instance.title = validated_data['title']
        instance.director = Director.objects.get(pk=validated_data['director']['id'])
        genres = []
        actors = []
        companies = []

        for genre in validated_data['genres']:
            genres.append(genre['id'])
        for actor in validated_data['actors']:
            actors.append(actor['id'])
        for company in validated_data['company']:
            companies.append(company['id'])
        instance.genres.set(genres)
        instance.actors.set(actors)
        instance.company.set(companies)
        instance.series_number = validated_data['series_number']
        instance.save()
        return instance

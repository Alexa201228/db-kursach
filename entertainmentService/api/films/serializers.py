from rest_framework import serializers

from films.models import Film, Genre
from users.models import Director, Actor
from api.companies.serializers import CompanySerializer


class ActorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Actor
        fields = '__all__'


class DirectorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Director
        fields = '__all__'


class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = '__all__'


class FilmSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(required=False, many=True)
    director = DirectorSerializer(required=False)
    actors = ActorSerializer(required=False, many=True)
    company = CompanySerializer(required=False, many=True)

    class Meta:
        model = Film
        fields = '__all__'

    def update(self, instance, *args, **kwargs):

        validated_data = self.context['request'].data
        print(validated_data)
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
        instance.save()
        return instance

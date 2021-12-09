from rest_framework import serializers

from films.models import Film, Genre
from users.models import Director, Actor


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

    class Meta:
        model = Film
        fields = '__all__'

    def update(self, instance, *args, **kwargs):
        validated_data = self.context['request'].data
        instance.title = validated_data['title']
        instance.director = Director.objects.get(pk=validated_data['director']['id'])
        for genre in validated_data['genres']:
            if genre not in instance.genres.all():
                instance.genres.add(genre['id'])
        instance.save()
        return instance

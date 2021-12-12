from rest_framework import serializers

from games.models import Game
from api.films.serializers import GenreSerializer
from api.companies.serializers import CompanySerializer


class GameSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, required=False)
    company = CompanySerializer(required=False, many=True)

    class Meta:
        model = Game
        fields = '__all__'
        extra_kwargs = {'id': {'read_only': True}}

    def update(self, instance, *args, **kwargs):

        validated_data = self.context['request'].data
        instance.title = validated_data['title']
        genres = []
        instance.description = validated_data['description']
        companies = []

        for genre in validated_data['genres']:
            genres.append(genre['id'])
        for company in validated_data['company']:
            companies.append(company['id'])
        instance.genres.set(genres)
        instance.company.set(companies)
        instance.save()
        return instance

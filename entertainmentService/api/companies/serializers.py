from rest_framework import serializers

from companies.models import Company


class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = '__all__'
        extra_kwargs = {'id': {'read_only': True}}

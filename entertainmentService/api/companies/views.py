from rest_framework import mixins, viewsets

from .serializers import CompanySerializer
from companies.models import Company


class CompanyListView(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = CompanySerializer
    queryset = Company.objects.all()
from rest_framework import mixins, viewsets
from api.permissions import IsManager

from .serializers import CompanySerializer
from companies.models import Company


class CompanyListView(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    serializer_class = CompanySerializer
    queryset = Company.objects.all()


class CompanyDetailView(viewsets.GenericViewSet, mixins.CreateModelMixin,
                        mixins.UpdateModelMixin, mixins.RetrieveModelMixin,
                        mixins.DestroyModelMixin):
    serializer_class = CompanySerializer
    queryset = Company.objects.all()
    permission_classes = [IsManager]
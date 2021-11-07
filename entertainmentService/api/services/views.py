from rest_framework import mixins, viewsets

from .serializers import ServiceSerializer
from services.models import Service


class ServiceListView(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = ServiceSerializer
    queryset = Service.objects.all()
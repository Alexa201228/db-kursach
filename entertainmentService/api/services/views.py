from rest_framework import mixins, viewsets

from .serializers import ServiceSerializer
from services.models import Service
from api.permissions import IsManager


class ServiceListView(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = ServiceSerializer
    queryset = Service.objects.all()


class ServiceDetailView(viewsets.GenericViewSet, mixins.CreateModelMixin,
                        mixins.UpdateModelMixin, mixins.RetrieveModelMixin,
                        mixins.DestroyModelMixin):
    serializer_class = ServiceSerializer
    queryset = Service.objects.all()
    permission_classes = [IsManager]
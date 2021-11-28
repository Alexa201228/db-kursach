from rest_framework import mixins, viewsets, permissions

from .serializers import ServiceSerializer
from services.models import Service
from api.permissions import IsManager


class ServiceListView(mixins.ListModelMixin,
                      mixins.RetrieveModelMixin,
                      viewsets.GenericViewSet):
    serializer_class = ServiceSerializer
    queryset = Service.objects.all()
    permission_classes = [permissions.AllowAny]


class ServiceDetailView(viewsets.GenericViewSet, mixins.CreateModelMixin,
                        mixins.UpdateModelMixin, mixins.RetrieveModelMixin,
                        mixins.DestroyModelMixin,
                        mixins.ListModelMixin):
    serializer_class = ServiceSerializer
    queryset = Service.objects.all()
    permission_classes = [IsManager]

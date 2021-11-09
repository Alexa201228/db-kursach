from rest_framework import mixins, viewsets

from .serializers import SeriesSerializer
from series.models import Series
from api.permissions import IsManager


class SeriesListView(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    serializer_class = SeriesSerializer
    queryset = Series.objects.all()


class SeriesDetailView(viewsets.GenericViewSet, mixins.CreateModelMixin,
                        mixins.UpdateModelMixin, mixins.RetrieveModelMixin,
                        mixins.DestroyModelMixin):
    serializer_class = SeriesSerializer
    queryset = Series.objects.all()
    permission_classes = [IsManager]
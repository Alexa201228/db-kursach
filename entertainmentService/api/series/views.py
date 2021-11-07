from rest_framework import mixins, viewsets

from .serializers import SeriesSerializer
from series.models import Series


class SeriesListView(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = SeriesSerializer
    queryset = Series.objects.all()
from rest_framework import mixins, viewsets

from .serializers import FilmSerializer
from films.models import Film


class FilmListView(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = FilmSerializer
    queryset = Film.objects.all()

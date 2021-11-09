from rest_framework import mixins, viewsets

from .serializers import FilmSerializer
from films.models import Film
from api.permissions import IsManager


class FilmListView(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    serializer_class = FilmSerializer
    queryset = Film.objects.all()


class FilmDetailView(viewsets.GenericViewSet, mixins.CreateModelMixin,
                        mixins.UpdateModelMixin, mixins.RetrieveModelMixin,
                        mixins.DestroyModelMixin):
    serializer_class = FilmSerializer
    queryset = Film.objects.all()
    permission_classes = [IsManager]
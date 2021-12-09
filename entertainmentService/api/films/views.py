from rest_framework import mixins, viewsets, permissions

from .serializers import FilmSerializer, DirectorSerializer, ActorSerializer, GenreSerializer
from films.models import Film, Genre
from api.permissions import IsManager
from users.models import Director, Actor


class FilmListView(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    serializer_class = FilmSerializer
    queryset = Film.objects.raw('SELECT * FROM films_film')


class FilmDetailView(viewsets.GenericViewSet,
                     mixins.ListModelMixin,
                     mixins.CreateModelMixin,
                     mixins.UpdateModelMixin,
                     mixins.RetrieveModelMixin,
                     mixins.DestroyModelMixin):
    serializer_class = FilmSerializer
    queryset = Film.objects.all()
    permission_classes = [IsManager]


class DirectorListView(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = DirectorSerializer
    queryset = Director.objects.all()
    permission_classes = [permissions.AllowAny]


class ActorsListView(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = ActorSerializer
    queryset = Actor.objects.all()
    permission_classes = [permissions.AllowAny]


class GenreListView(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = GenreSerializer
    queryset = Genre.objects.all()
    permission_classes = [permissions.AllowAny]

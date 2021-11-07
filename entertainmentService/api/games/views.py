from rest_framework import mixins, viewsets

from .serializers import GameSerializer
from games.models import Game


class GameListView(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = GameSerializer
    queryset = Game.objects.all()

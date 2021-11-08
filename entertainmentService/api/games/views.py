from rest_framework import mixins, viewsets

from .serializers import GameSerializer
from games.models import Game
from api.permissions import IsManager


class GameListView(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = GameSerializer
    queryset = Game.objects.all()


class GameDetailView(viewsets.GenericViewSet, mixins.CreateModelMixin,
                        mixins.UpdateModelMixin, mixins.RetrieveModelMixin,
                        mixins.DestroyModelMixin):
    serializer_class = GameSerializer
    queryset = Game.objects.all()
    permission_classes = [IsManager]

from rest_framework import mixins, viewsets, permissions
from rest_framework.generics import get_object_or_404

from .serializers import CommentSerializer, CommunitySerializer, \
    SubscriptionSerializer, \
    UserFilmStatisticsSerializer, UserGameStatisticsSerializer, \
    UserSeriesStatisticsSerializer
from user_stuff.models import Comment, UserGameStatistics, UserFilmStatistics, \
    UserSeriesStatistics, Subscription, Community

from ..permissions import IsManager


class CommentModelViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.raw('SELECT * FROM user_stuff_comment')


class UserGameStatisticsView(mixins.RetrieveModelMixin,
                             mixins.UpdateModelMixin,
                             viewsets.GenericViewSet):
    serializer_class = UserGameStatisticsSerializer
    queryset = UserGameStatistics.objects.all()

    def get_object(self, request, *args, **kwargs):
        return get_object_or_404(self.get_queryset(), user=request.user)


class UserFilmStatisticsView(mixins.RetrieveModelMixin,
                             mixins.UpdateModelMixin,
                             viewsets.GenericViewSet):
    serializer_class = UserFilmStatisticsSerializer
    queryset = UserGameStatistics.objects.all()

    def get_object(self, request, *args, **kwargs):
        return get_object_or_404(self.get_queryset(), user=request.user)


class UserSeriesStatisticsView(mixins.RetrieveModelMixin,
                               mixins.UpdateModelMixin,
                               viewsets.GenericViewSet):
    serializer_class = UserSeriesStatisticsSerializer
    queryset = UserGameStatistics.objects.all()

    def get_object(self, request, *args, **kwargs):
        return get_object_or_404(self.get_queryset(), user=request.user)


class CommunityModelViewSet(viewsets.ModelViewSet):
    serializer_class = CommunitySerializer
    queryset = Community.objects.all()


class SubscriptionModelViewSet(viewsets.ModelViewSet):
    serializer_class = SubscriptionSerializer
    queryset = Subscription.objects.all()
    permission_classes = [IsManager]


class SubscriptionListDetailUpdateView(mixins.ListModelMixin,
                                       mixins.RetrieveModelMixin,
                                       mixins.UpdateModelMixin,
                                       viewsets.GenericViewSet):
    serializer_class = SubscriptionSerializer
    queryset = Subscription.objects.all()
    permission_classes = [permissions.AllowAny]

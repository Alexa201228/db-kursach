from django.urls import path, include

from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView,\
                                            TokenRefreshView

from api.users.views import RegisterUserApiView, UserApiView, LogoutView
from api.films.views import FilmListView, FilmDetailView, DirectorListView, ActorsListView, GenreListView
from api.companies.views import CompanyListView, CompanyDetailView
from api.games.views import GameListView, GameDetailView
from api.series.views import SeriesListView, SeriesDetailView
from api.services.views import ServiceListView, ServiceDetailView
from api.user_stuff.views import UserGameStatisticsView, CommentModelViewSet, \
    UserFilmStatisticsView, UserSeriesStatisticsView, CommunityModelViewSet,\
SubscriptionModelViewSet, SubscriptionListDetailUpdateView


router = routers.DefaultRouter()

router.register('users', UserApiView, basename='users')
router.register('actors', ActorsListView, basename='actors')
router.register('directors', DirectorListView, basename='directors')
router.register('genres', GenreListView, basename='genres')
router.register('films', FilmListView, basename='films')
router.register('companies', CompanyListView, basename='companies')
router.register('games', GameListView, basename='games')
router.register('series_list', SeriesListView, basename='series_list')
router.register('services', ServiceListView, basename='services')
router.register('company/detail', CompanyDetailView, basename='company-details')
router.register('film/detail', FilmDetailView, basename='film-details')
router.register('series/detail', SeriesDetailView, basename='series-details')
router.register('game/detail', GameDetailView, basename='game-details')
router.register('service/detail', ServiceDetailView, basename='service-details')
router.register('game_statistics', UserGameStatisticsView, basename='game-statistics')
router.register('comments', CommentModelViewSet, basename='comment')
router.register('series_statistics', UserSeriesStatisticsView, basename='series-statistics')
router.register('film_statistics', UserFilmStatisticsView, basename='film-statistics')
router.register('community', CommunityModelViewSet, basename='community')
router.register('subscriptions', SubscriptionModelViewSet, basename='subscriptions')
router.register('subscription/detail', SubscriptionListDetailUpdateView, basename='subscription-detail')


urlpatterns = [
    path('register/', RegisterUserApiView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('', include(router.urls)),
]

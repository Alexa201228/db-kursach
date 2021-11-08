from django.urls import path, include

from rest_framework import routers
from api.users.views import RegisterUserApiView, UserApiView
from api.films.views import FilmListView
from api.companies.views import CompanyListView, CompanyDetailView
from api.games.views import GameListView
from api.series.views import SeriesListView
from api.services.views import ServiceListView


router = routers.DefaultRouter()

router.register('users', UserApiView, basename='users')
router.register('films', FilmListView, basename='films')
router.register('companies', CompanyListView, basename='companies')
router.register('games', GameListView, basename='games')
router.register('series', SeriesListView, basename='series')
router.register('services', ServiceListView, basename='services')
router.register('company/detail', CompanyDetailView, basename='company-details')


urlpatterns = [
    path('register/', RegisterUserApiView.as_view(), name='register'),
    path('', include(router.urls)),
]

from django.db import models

from users.models import User
from services.models import Service
from films.models import Genre

from games.models import Game
from films.models import Film
from series.models import Series


class Community(models.Model):
    """
    Сущность 'Сообщество'
    """
    name = models.CharField(max_length=100, verbose_name='Название сообщества')
    description = models.TextField(verbose_name='Описание сообщества')
    users = models.ManyToManyField(User, related_name='communities')


class Subscription(models.Model):
    """
    Сущность 'Подписка'
    """
    name = models.CharField(max_length=50, verbose_name='Наименование подписки')
    duration = models.IntegerField(verbose_name='Срок подписки', null=True, blank=True)
    users = models.ManyToManyField(User, related_name='subscriptions', blank=True)
    services = models.ManyToManyField(Service, related_name='subscriptions', blank=True)
    price = models.IntegerField(null=True, blank=True)


class UserGameStatistics(models.Model):
    """
    Сущность 'Игровая статистика пользователя'
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='game_statistics')
    games = models.ManyToManyField(Game, related_name='game_statistics', blank=True)
    genres = models.ManyToManyField(Genre, related_name='game_statistics', blank=True)
    spent_time = models.TimeField(verbose_name='Затраченное время', null=True, blank=True)


class UserFilmStatistics(models.Model):
    """
        Сущность 'Статистика пользователя по фильмам'
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='film_statistics')
    films = models.ManyToManyField(Film, related_name='film_statistics', blank=True)
    genres = models.ManyToManyField(Genre, related_name='film_statistics', blank=True)
    spent_time = models.TimeField(verbose_name='Затраченное время', null=True, blank=True)


class UserSeriesStatistics(models.Model):
    """
        Сущность 'Статистика пользователя по сериалам'
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='series_statistics')
    series = models.ManyToManyField(Series, related_name='series_statistics', blank=True)
    genres = models.ManyToManyField(Genre, related_name='series_statistics', blank=True)
    spent_time = models.TimeField(verbose_name='Затраченное время', null=True, blank=True)


class Comment(models.Model):
    """
    Сущность 'Комментарий'
    """
    comment_body = models.TextField(verbose_name='Текст комментария')
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='comments')
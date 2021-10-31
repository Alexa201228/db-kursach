from django.db import models

from users.models import User
from services.models import Service
from films.models import Genre


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
    duration = models.DurationField(verbose_name='Срок подписки')
    users = models.ManyToManyField(User, related_name='subscriptions')
    services = models.ManyToManyField(Service, related_name='subscriptions')


class UserGameStatistics(models.Model):
    """
    Сущность 'Игровая статистика пользователя'
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='game_statistics')
    genres = models.ManyToManyField(Genre, related_name='game_statistics')
    spent_time = models.TimeField(verbose_name='Затраченное время')


class UserFilmStatistics(models.Model):
    """
        Сущность 'Статистика пользователя по фильмам'
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='film_statistics')
    genres = models.ManyToManyField(Genre, related_name='film_statistics')
    spent_time = models.TimeField(verbose_name='Затраченное время')


class UserSeriesStatistics(models.Model):
    """
        Сущность 'Статистика пользователя по сериалам'
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='series_statistics')
    genres = models.ManyToManyField(Genre, related_name='series_statistics')
    spent_time = models.TimeField(verbose_name='Затраченное время')


class Comments(models.Model):
    """
    Сущность 'Комментарий'
    """
    comment_body = models.TextField(verbose_name='Текст комментария')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
from django.db import models

from films.models import Film
from series.models import Series
from games.models import Game


class Service(models.Model):
    """
    Сущность 'Сервис'
    """
    name = models.CharField(max_length=30, verbose_name='Название сервиса')
    films = models.ManyToManyField(Film, related_name='services')
    series = models.ManyToManyField(Series, related_name='services')
    games = models.ManyToManyField(Game, related_name='services')

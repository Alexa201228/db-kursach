from django.db import models

from companies.models import Company
from films.models import Genre


class Game(models.Model):
    """
    Сущность 'Игра'
    """
    title = models.CharField(verbose_name='Название игры', max_length=250)
    description = models.TextField(verbose_name='Описание игры', null=True, blank=True)
    company = models.ManyToManyField(Company, related_name='games', blank=True)
    genres = models.ManyToManyField(Genre, related_name='games', blank=True)

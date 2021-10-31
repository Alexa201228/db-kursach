from django.db import models

from companies.models import Company
from film.models import Genre


class Game(models.Model):
    """
    Сущность 'Игра'
    """
    title = models.CharField(verbose_name='Название игры', max_length=250)
    description = models.TextField(verbose_name='Описание игры')
    company = models.ManyToManyField(Company, related_name='games')
    genres = models.ManyToManyField(Genre, related_name='games')

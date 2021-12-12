from django.db import models

from users.models import Director, Actor
from companies.models import Company


class Genre(models.Model):
    """
    Сущность 'Жанр'
    """
    name = models.CharField(max_length=50, verbose_name='Название жанра', null=True)


class Film(models.Model):
    """
    Сущность 'Фильм'
    """
    title = models.CharField(verbose_name='Название фильма', max_length=250)
    director = models.ForeignKey(Director, on_delete=models.DO_NOTHING, related_name='films', null=True, blank=True)
    company = models.ManyToManyField(Company, related_name='films', blank=True)
    actors = models.ManyToManyField(Actor, related_name='films', blank=True)
    genres = models.ManyToManyField(Genre, related_name='films', blank=True)


from django.db import models

from companies.models import Company
from users.models import Director, Actor
from films.models import Genre


class Series(models.Model):
    """
    Сущность 'Сериал'
    """
    title = models.CharField(verbose_name='Название сериала', max_length=250, null=True)
    director = models.ForeignKey(Director, on_delete=models.DO_NOTHING, related_name='series', null=True, blank=True)
    company = models.ManyToManyField(Company, related_name='series', blank=True)
    actors = models.ManyToManyField(Actor, related_name='series', blank=True)
    genres = models.ManyToManyField(Genre, related_name='series', blank=True)
    series_number = models.IntegerField(verbose_name='Количество серий', null=True, blank=True)



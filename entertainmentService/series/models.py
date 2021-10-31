from django.db import models

from company.models import Company
from users.models import Director, Actor
from films.models import Genre


class Series(models.Model):
    """
    Сущность 'Сериал'
    """
    title = models.CharField(verbose_name='Название сериала', max_length=250)
    director = models.ForeignKey(Director, on_delete=models.DO_NOTHING, related_name='series')
    company = models.ManyToManyField(Company, related_name='series')
    actors = models.ManyToManyField(Actor, related_name='series')
    genres = models.ManyToManyField(Genre, related_name='series')
    series_number = models.IntegerField(verbose_name='Количество серий')



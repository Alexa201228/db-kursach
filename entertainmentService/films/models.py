from django.db import models


class Genre(models.Model):
    name = models.CharField(max_length=50, verbose_name='Название жанра')


class Film(models.Model):
    title = models.CharField(verbose_name='Название фильма', max_length=250)
    director = models.ForeignKey()
    company = models.ManyToManyField()
    actors = models.ForeignKey()
    genres = models.ManyToManyField(Genre, related_name='films')


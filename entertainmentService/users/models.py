from django.db import models
from django.contrib.auth.models import AbstractUser

from films.models import Film
from series.models import Series
from games.models import Game


class User(AbstractUser):
    """
    Сущность пользователя сервиса
    """
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=50, verbose_name='Имя')
    last_name = models.CharField(max_length=50, verbose_name='Фамилия')
    birthday = models.DateField(verbose_name='Дата рождения')
    profile_photo = models.ImageField(upload_to='user_photos')
    films = models.ManyToManyField(Film, related_name='users')
    series = models.ManyToManyField(Series, related_name='users')
    games = models.ManyToManyField(Game, related_name='users')

    USERNAME_FIELD = 'email'


class Director(models.Model):
    """
    Сущность 'Режиссер'
    """
    first_name = models.CharField(max_length=50, verbose_name='Имя')
    last_name = models.CharField(max_length=50, verbose_name='Фамилия')


class Actor(models.Model):
    """
    Сущность 'Актер'
    """
    first_name = models.CharField(max_length=50, verbose_name='Имя')
    last_name = models.CharField(max_length=50, verbose_name='Фамилия')


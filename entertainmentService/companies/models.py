from django.db import models


class Company(models.Model):
    """
    Сущность 'Компания'
    """
    name = models.CharField(max_length=50, null=True, blank=True)
    country = models.CharField(max_length=50, null=True, blank=True)

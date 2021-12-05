# Generated by Django 3.2.7 on 2021-12-05 06:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('companies', '0001_initial'),
        ('films', '0003_auto_20211205_0959'),
        ('games', '0002_auto_20211205_0919'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='company',
            field=models.ManyToManyField(blank=True, related_name='games', to='companies.Company'),
        ),
        migrations.AlterField(
            model_name='game',
            name='genres',
            field=models.ManyToManyField(blank=True, related_name='games', to='films.Genre'),
        ),
    ]
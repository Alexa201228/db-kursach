# Generated by Django 3.2.7 on 2021-12-16 16:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('films', '0004_alter_genre_name'),
        ('series', '0007_alter_series_title'),
        ('games', '0003_auto_20211205_0959'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('user_stuff', '0002_subscription_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to=settings.AUTH_USER_MODEL),
        ),
        migrations.RemoveField(
            model_name='userfilmstatistics',
            name='films',
        ),
        migrations.AddField(
            model_name='userfilmstatistics',
            name='films',
            field=models.ManyToManyField(blank=True, related_name='film_statistics', to='films.Film'),
        ),
        migrations.AlterField(
            model_name='userfilmstatistics',
            name='spent_time',
            field=models.TimeField(blank=True, null=True, verbose_name='Затраченное время'),
        ),
        migrations.RemoveField(
            model_name='usergamestatistics',
            name='games',
        ),
        migrations.AddField(
            model_name='usergamestatistics',
            name='games',
            field=models.ManyToManyField(blank=True, related_name='game_statistics', to='games.Game'),
        ),
        migrations.AlterField(
            model_name='usergamestatistics',
            name='spent_time',
            field=models.TimeField(blank=True, null=True, verbose_name='Затраченное время'),
        ),
        migrations.RemoveField(
            model_name='userseriesstatistics',
            name='series',
        ),
        migrations.AddField(
            model_name='userseriesstatistics',
            name='series',
            field=models.ManyToManyField(blank=True, related_name='series_statistics', to='series.Series'),
        ),
        migrations.AlterField(
            model_name='userseriesstatistics',
            name='spent_time',
            field=models.TimeField(blank=True, null=True, verbose_name='Затраченное время'),
        ),
    ]

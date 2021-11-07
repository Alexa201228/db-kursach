# Generated by Django 3.2.7 on 2021-11-07 05:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user_stuff', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('films', '0002_initial'),
        ('services', '0001_initial'),
        ('games', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='userseriesstatistics',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='series_statistics', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='usergamestatistics',
            name='games',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='game_statistics', to='games.game'),
        ),
        migrations.AddField(
            model_name='usergamestatistics',
            name='genres',
            field=models.ManyToManyField(related_name='game_statistics', to='films.Genre'),
        ),
        migrations.AddField(
            model_name='usergamestatistics',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='game_statistics', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='userfilmstatistics',
            name='films',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='film_statistics', to='films.film'),
        ),
        migrations.AddField(
            model_name='userfilmstatistics',
            name='genres',
            field=models.ManyToManyField(related_name='film_statistics', to='films.Genre'),
        ),
        migrations.AddField(
            model_name='userfilmstatistics',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='film_statistics', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='subscription',
            name='services',
            field=models.ManyToManyField(related_name='subscriptions', to='services.Service'),
        ),
        migrations.AddField(
            model_name='subscription',
            name='users',
            field=models.ManyToManyField(related_name='subscriptions', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='community',
            name='users',
            field=models.ManyToManyField(related_name='communities', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='comments',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to=settings.AUTH_USER_MODEL),
        ),
    ]

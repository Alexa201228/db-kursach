from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone


class UserManager(BaseUserManager):

    def create_user(self, email, password=None, is_staff=False, is_active=True, **additional_fields):
        """
        User с регистрацией через e-mail
        """
        if not email:
            raise ValueError('У пользователя должен быть email')
        if not password:
            raise ValueError('Поле пароля не должно быть пустым')
        user = self.model(
            email=self.normalize_email(email),
            is_active=is_active,
            is_staff=is_staff,
            **additional_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **additional_fields):
        """
        Создание superuser'а
        """
        return self.create_user(email, password, is_staff=True, is_superuser=True, **additional_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
    Сущность пользователя сервиса
    """
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=50, verbose_name='Имя')
    last_name = models.CharField(max_length=50, verbose_name='Фамилия')
    birthday = models.DateField(verbose_name='Дата рождения', null=True, blank=True)
    profile_photo = models.ImageField(upload_to='user_photos', null=True, blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['']


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


from django.contrib.auth.models import AbstractUser
from django.db import models



class User(AbstractUser):

    ROLE_CHOICES = (
        ("client", "Client"),
        ("admin", "Admin"),
    )

    email = models.EmailField(unique=True)

    phone = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="client"
    )

    avatar = models.URLField(
        blank=True,
        null=True
    )
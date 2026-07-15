from django.db import models
from users.models import User
from products.models import Product


class Order(models.Model):
    STATUS_CHOICES = (
        ("pending", "En attente"),
        ("paid", "Payée"),
        ("shipped", "Expédiée"),
        ("delivered", "Livrée"),
        ("cancelled", "Annulée"),
    )

    PAYMENT_CHOICES = (
        ("cash", "Paiement à la livraison"),
        ("mobile_money", "Mobile Money"),
        ("card", "Carte bancaire"),
        ("paypal", "PayPal"),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="orders"
    )

    address = models.CharField(
        max_length=255
    )

    phone = models.CharField(
        max_length=20
    )

    payment_method = models.CharField(
        max_length=30,
        choices=PAYMENT_CHOICES,
        default="cash"
    )

    total = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"Commande {self.id}"

class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items"
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    quantity = models.PositiveIntegerField(default=1)

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )
from django.db import models
from categories.models import Category

class Product(models.Model):
    # --- Informations de base ---
    name = models.CharField(
        max_length=200,
        verbose_name="Nom du produit"
    )
    brand = models.CharField(
        max_length=100, 
        blank=True,
        verbose_name="Marque"
    )
    description = models.TextField(
        verbose_name="Description"
    )
    ingredients = models.TextField(
        blank=True,
        verbose_name="Ingrédients"
    )

    # --- Classification et organisation ---
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="products",
        verbose_name="Catégorie"
    )

    # --- Tarification et Stock ---
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name="Prix"
    )
    discount = models.PositiveIntegerField(
        default=0,
        verbose_name="Remise (%)"
    )
    stock = models.PositiveIntegerField(
        default=0,
        verbose_name="Stock disponible"
    )

    # --- Évaluation et Visuels ---
    image = models.ImageField(
        upload_to="products/",
        blank=True,
        null=True,
        verbose_name="Image du produit"
    )
    rating = models.DecimalField(
        max_digits=2,
        decimal_places=1,
        default=0,
        verbose_name="Note"
    )

    # --- Drapeaux (Flags) d'affichage ---
    is_featured = models.BooleanField(
        default=False,
        verbose_name="Produit vedette"
    )
    is_new = models.BooleanField(
        default=True,
        verbose_name="Nouveauté"
    )

    # --- Dates de suivi ---
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Date de création"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Dernière modification"
    )

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Produit"
        verbose_name_plural = "Produits"

    def __str__(self):
        return f"{self.brand} - {self.name}" if self.brand else self.name
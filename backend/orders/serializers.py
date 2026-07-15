from rest_framework import serializers

from .models import Order, OrderItem

from products.models import Product



# =========================
# PRODUITS DANS LA COMMANDE
# =========================

class OrderItemCreateSerializer(serializers.ModelSerializer):


    class Meta:

        model = OrderItem

        fields = [
            "product",
            "quantity",
            "price"
        ]




# =========================
# AFFICHAGE DETAIL PRODUIT
# =========================

class OrderItemSerializer(serializers.ModelSerializer):


    product_name = serializers.CharField(
        source="product.name",
        read_only=True
    )


    class Meta:

        model = OrderItem

        fields = [

            "id",

            "product",

            "product_name",

            "quantity",

            "price"

        ]




# =========================
# CREATION COMMANDE
# =========================

class OrderCreateSerializer(serializers.ModelSerializer):


    items = OrderItemCreateSerializer(
        many=True
    )



    class Meta:

        model = Order

        fields = [

            "address",

            "phone",

            "payment_method",

            "total",

            "items"

        ]



    def create(self, validated_data):


        items_data = validated_data.pop(
            "items"
        )


        order = Order.objects.create(
            **validated_data
        )



        for item in items_data:


            product = item["product"]


            OrderItem.objects.create(

                order=order,

                product=product,

                quantity=item["quantity"],

                price=item["price"]

            )



        return order




# =========================
# AFFICHAGE COMMANDE
# =========================

class OrderSerializer(serializers.ModelSerializer):


    items = OrderItemSerializer(
        many=True,
        read_only=True
    )


    class Meta:


        model = Order


        fields = [

            "id",

            "address",

            "phone",

            "payment_method",

            "total",

            "status",

            "created_at",

            "items"

        ]
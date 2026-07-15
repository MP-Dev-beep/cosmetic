from rest_framework import serializers

from .models import Order, OrderItem
from products.models import Product



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





class OrderCreateSerializer(serializers.Serializer):

    address = serializers.CharField()

    phone = serializers.CharField()

    payment_method = serializers.CharField()


    items = serializers.ListField(
        child=serializers.DictField()
    )



    def create(self, validated_data):

        user = self.context["request"].user


        items_data = validated_data.pop(
            "items"
        )


        total = 0



        # création commande

        order = Order.objects.create(

            user=user,

            total=0,

            **validated_data

        )



        for item in items_data:


            product_id = item.get(
                "product"
            )


            quantity = item.get(
                "quantity"
            )


            product = Product.objects.get(
                id=product_id
            )


            price = product.price



            total += price * quantity



            OrderItem.objects.create(

                order=order,

                product=product,

                quantity=quantity,

                price=price

            )



        order.total = total

        order.save()



        return order
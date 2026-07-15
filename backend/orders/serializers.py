from rest_framework import serializers

from .models import Order, OrderItem

from products.models import Product





# ==========================
# ITEM COMMANDE
# ==========================

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







# ==========================
# CREATION COMMANDE
# ==========================

class OrderCreateSerializer(serializers.ModelSerializer):


    items = OrderItemSerializer(
        many=True
    )


    class Meta:

        model = Order

        fields = [

            "address",
            "phone",
            "payment_method",
            "items"

        ]




    def create(self, validated_data):


        items_data = validated_data.pop(
            "items"
        )


        user = self.context["request"].user



        total = 0



        for item in items_data:


            total += (
                item["price"] *
                item["quantity"]
            )





        order = Order.objects.create(

            user=user,

            total=total,

            **validated_data

        )





        for item in items_data:


            OrderItem.objects.create(

                order=order,

                product=item["product"],

                quantity=item["quantity"],

                price=item["price"]

            )




        return order







# ==========================
# AFFICHAGE ADMIN
# ==========================

class OrderSerializer(serializers.ModelSerializer):


    user = serializers.SerializerMethodField()



    items = OrderItemSerializer(
        many=True,
        read_only=True
    )



    class Meta:

        model = Order

        fields = "__all__"




    def get_user(self,obj):


        return {


            "id":obj.user.id,

            "username":obj.user.username,

            "email":obj.user.email


        }
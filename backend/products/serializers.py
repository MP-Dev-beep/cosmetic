from rest_framework import serializers

from .models import Product





class ProductSerializer(serializers.ModelSerializer):


    image = serializers.SerializerMethodField()


    category_name = serializers.CharField(

        source="category.name",

        read_only=True

    )



    class Meta:


        model = Product


        fields = [

            "id",

            "name",

            "brand",

            "description",

            "ingredients",

            "category",

            "category_name",

            "price",

            "discount",

            "stock",

            "image",

            "rating",

            "is_featured",

            "is_new",

            "created_at",

            "updated_at"

        ]





    def get_image(
        self,
        obj
    ):


        request = self.context.get(
            "request"
        )



        if obj.image:


            return request.build_absolute_uri(

                obj.image.url

            )



        return None
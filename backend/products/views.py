from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Product
from .serializers import ProductSerializer
from .permissions import IsAdminUser



# =====================================
# LISTE + CREATION PRODUITS
# =====================================


class ProductListCreateView(
    generics.ListCreateAPIView
):

    serializer_class = ProductSerializer


    def get_queryset(self):

        queryset = Product.objects.all()


        # Filtrer par catégorie
        category_id = self.request.query_params.get(
            "category"
        )


        if category_id:

            queryset = queryset.filter(
                category_id=category_id
            )


        return queryset



    def get_permissions(self):


        if self.request.method == "POST":


            return [
                IsAdminUser()
            ]



        return [
            IsAuthenticatedOrReadOnly()
        ]





# =====================================
# DETAIL + MODIFICATION + SUPPRESSION
# =====================================


class ProductDetailView(
    generics.RetrieveUpdateDestroyAPIView
):


    queryset = Product.objects.all()


    serializer_class = ProductSerializer



    def get_permissions(self):


        if self.request.method in [

            "PUT",
            "PATCH",
            "DELETE"

        ]:


            return [

                IsAdminUser()

            ]



        return [

            IsAuthenticatedOrReadOnly()

        ]
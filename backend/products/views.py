from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly


from .models import Product

from .serializers import ProductSerializer

from .permissions import IsAdminUser





# ============================
# LISTE + CREATION PRODUIT
# ============================


class ProductListCreateView(
    generics.ListCreateAPIView
):


    queryset = Product.objects.all()


    serializer_class = ProductSerializer



    def get_permissions(self):


        if self.request.method == "POST":

            return [
                IsAdminUser()
            ]


        return [
            IsAuthenticatedOrReadOnly()
        ]






# ============================
# DETAIL + MODIFICATION + SUPPRESSION
# ============================


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
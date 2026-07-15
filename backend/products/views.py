from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import Product
from .serializers import ProductSerializer

from users.permissions import IsAdmin


# ==========================
# PRODUITS PUBLICS
# ==========================

class ProductListView(generics.ListAPIView):

    queryset = Product.objects.all()

    serializer_class = ProductSerializer

    permission_classes = [
        AllowAny
    ]



class ProductDetailView(generics.RetrieveAPIView):

    queryset = Product.objects.all()

    serializer_class = ProductSerializer

    permission_classes = [
        AllowAny
    ]



# ==========================
# ADMIN PRODUITS
# ==========================


class AdminProductCreateView(
    generics.ListCreateAPIView
):

    queryset = Product.objects.all()

    serializer_class = ProductSerializer

    permission_classes = [
        IsAdmin
    ]



class AdminProductManageView(
    generics.RetrieveUpdateDestroyAPIView
):

    queryset = Product.objects.all()

    serializer_class = ProductSerializer

    permission_classes = [
        IsAdmin
    ]
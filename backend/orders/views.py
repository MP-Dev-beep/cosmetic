from rest_framework import generics

from rest_framework.permissions import IsAuthenticated


from .models import Order

from .serializers import (
    OrderSerializer,
    OrderCreateSerializer
)





# =========================
# CREER UNE COMMANDE
# =========================


class OrderCreateView(
    generics.CreateAPIView
):


    serializer_class = OrderCreateSerializer


    permission_classes = [
        IsAuthenticated
    ]





# =========================
# LISTE COMMANDES CLIENT
# =========================


class OrderListView(
    generics.ListAPIView
):

    serializer_class = OrderSerializer


    permission_classes = [
        IsAuthenticated
    ]



    def get_queryset(self):

        return Order.objects.filter(
            user=self.request.user
        )






# =========================
# DETAIL COMMANDE
# =========================


class OrderDetailView(
    generics.RetrieveAPIView
):

    serializer_class = OrderSerializer


    permission_classes = [
        IsAuthenticated
    ]



    def get_queryset(self):

        return Order.objects.filter(
            user=self.request.user
        )
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Order
from .serializers import (
    OrderSerializer,
    OrderCreateSerializer
)


# =========================
# CREATION COMMANDE CLIENT
# =========================

class OrderCreateView(generics.CreateAPIView):

    serializer_class = OrderCreateSerializer

    permission_classes = [
        IsAuthenticated
    ]


    def perform_create(self, serializer):

        serializer.save(
            user=self.request.user
        )



# =========================
# LISTE COMMANDES CLIENT
# =========================

class OrderListView(generics.ListAPIView):

    serializer_class = OrderSerializer

    permission_classes = [
        IsAuthenticated
    ]


    def get_queryset(self):

        return Order.objects.filter(
            user=self.request.user
        ).prefetch_related(
            "items"
        )



# =========================
# DETAIL COMMANDE CLIENT
# =========================

class OrderDetailView(generics.RetrieveAPIView):

    serializer_class = OrderSerializer

    permission_classes = [
        IsAuthenticated
    ]


    def get_queryset(self):

        return Order.objects.filter(
            user=self.request.user
        ).prefetch_related(
            "items"
        )
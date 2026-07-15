from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Order
from .serializers import OrderSerializer

from users.permissions import IsAdminUser



# ============================
# LISTE DES COMMANDES ADMIN
# ============================

class AdminOrderListView(
    generics.ListAPIView
):

    queryset = Order.objects.all()

    serializer_class = OrderSerializer


    permission_classes = [
        IsAdminUser
    ]




# ============================
# DETAIL + MODIFICATION STATUT
# ============================

class AdminOrderDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    queryset = Order.objects.all()

    serializer_class = OrderSerializer

    permission_classes = [
        IsAdminUser
    ]
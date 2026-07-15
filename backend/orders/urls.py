from django.urls import path


from .views import (
    OrderCreateView,
    OrderListView,
    OrderDetailView
)



urlpatterns = [


    path(
        "create/",
        OrderCreateView.as_view(),
        name="order-create"
    ),



    path(
        "",
        OrderListView.as_view(),
        name="orders"
    ),



    path(
        "<int:pk>/",
        OrderDetailView.as_view(),
        name="order-detail"
    ),

]
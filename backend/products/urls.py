from django.urls import path

from .views import (
    ProductListView,
    ProductDetailView,
    AdminProductCreateView,
    AdminProductManageView
)


urlpatterns = [


    # PUBLIC

    path(
        "",
        ProductListView.as_view(),
        name="products"
    ),


    path(
        "<int:pk>/",
        ProductDetailView.as_view(),
        name="product-detail"
    ),



    # ADMIN

    path(
        "admin/",
        AdminProductCreateView.as_view(),
        name="admin-products"
    ),


    path(
        "admin/<int:pk>/",
        AdminProductManageView.as_view(),
        name="admin-product-manage"
    ),

]
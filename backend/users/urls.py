from django.urls import path


from .views import (
    RegisterView,
    ProfileView,
    UserListView,
    CustomTokenObtainPairView
)



urlpatterns = [


    path(
        "register/",
        RegisterView.as_view()
    ),


    path(
        "login/",
        CustomTokenObtainPairView.as_view()
    ),


    path(
        "profile/",
        ProfileView.as_view()
    ),


    path(
        "users/",
        UserListView.as_view()
    ),


]
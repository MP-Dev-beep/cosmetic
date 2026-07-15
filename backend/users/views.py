from rest_framework import generics
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
)

from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User

from .serializers import (
    RegisterSerializer,
    UserSerializer,
)

from .tokens import CustomTokenObtainPairSerializer



class RegisterView(generics.CreateAPIView):

    serializer_class = RegisterSerializer

    permission_classes = [
        AllowAny
    ]



class ProfileView(generics.RetrieveAPIView):

    serializer_class = UserSerializer

    permission_classes = [
        IsAuthenticated
    ]


    def get_object(self):

        return self.request.user



class CustomTokenObtainPairView(TokenObtainPairView):

    serializer_class = CustomTokenObtainPairSerializer
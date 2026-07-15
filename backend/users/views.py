from django.contrib.auth import authenticate


from rest_framework import status

from rest_framework.views import APIView

from rest_framework.response import Response

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated
)


from rest_framework_simplejwt.views import (
    TokenObtainPairView
)

from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer
)


from .models import User


from .serializers import (
    UserSerializer,
    RegisterSerializer
)





# =====================================
# JWT PERSONNALISE
# =====================================

class CustomTokenObtainPairSerializer(
    TokenObtainPairSerializer
):


    def validate(self, attrs):

        data = super().validate(attrs)


        data["user"] = UserSerializer(
            self.user
        ).data


        return data





class CustomTokenObtainPairView(
    TokenObtainPairView
):

    serializer_class = CustomTokenObtainPairSerializer







# =====================================
# INSCRIPTION
# =====================================


class RegisterView(APIView):

    permission_classes = [
        AllowAny
    ]


    def post(self, request):

        serializer = RegisterSerializer(
            data=request.data
        )


        if serializer.is_valid():

            user = serializer.save()


            return Response(

                UserSerializer(user).data,

                status=status.HTTP_201_CREATED
            )


        return Response(

            serializer.errors,

            status=status.HTTP_400_BAD_REQUEST
        )







# =====================================
# PROFIL
# =====================================


class ProfileView(APIView):


    permission_classes = [
        IsAuthenticated
    ]



    def get(self, request):

        serializer = UserSerializer(
            request.user
        )


        return Response(
            serializer.data
        )







# =====================================
# LISTE UTILISATEURS ADMIN
# =====================================


class UserListView(APIView):


    permission_classes = [
        IsAuthenticated
    ]



    def get(self, request):


        if request.user.role != "admin":

            return Response(
                {
                    "error":"Accès refusé"
                },
                status=403
            )


        users = User.objects.all()


        serializer = UserSerializer(
            users,
            many=True
        )


        return Response(
            serializer.data
        )
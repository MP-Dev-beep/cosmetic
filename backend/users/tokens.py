from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Informations ajoutées dans le JWT
        token["username"] = user.username
        token["email"] = user.email
        token["role"] = user.role

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        data["user"] = {
            "id": self.user.id,
            "username": self.user.username,
            "email": self.user.email,
            "phone": self.user.phone,
            "role": self.user.role,
            "avatar": self.user.avatar,
        }

        return data
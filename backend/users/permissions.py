from rest_framework.permissions import BasePermission


from rest_framework.permissions import BasePermission



class IsAdminUser(BasePermission):

    """
    Autorise uniquement les utilisateurs avec role='admin'
    """

    def has_permission(self, request, view):

        return (
            request.user.is_authenticated
            and request.user.role == "admin"
        )

class IsClient(BasePermission):
    """
    Permission réservée aux clients
    """

    def has_permission(self, request, view):

        return (
            request.user.is_authenticated
            and request.user.role == "client"
        )


class IsOwner(BasePermission):
    """
    L'utilisateur peut accéder uniquement à ses propres données
    """

    def has_object_permission(
        self,
        request,
        view,
        obj
    ):

        return obj.user == request.user
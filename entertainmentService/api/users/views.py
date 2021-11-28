from rest_framework import viewsets, status, generics, mixins, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from users.models import User

from .serializers import RegisterUserSerializer, UserSerializer


class RegisterUserApiView(generics.CreateAPIView):
    serializer_class = RegisterUserSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        try:

            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            token = RefreshToken.for_user(user)
            return Response(
                {
                    'access_token': str(token.access_token),
                    'refresh_token': str(token)
                 },
                status=status.HTTP_201_CREATED)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserApiView(mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        return self.request.user

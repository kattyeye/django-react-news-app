from django.shortcuts import get_object_or_404  # used in perform_create to
from rest_framework import generics
from .models import Profile

from .serializers import AccountsSerializer
# Create your views here.


class AccountListAPIView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = AccountsSerializer

    # def get_queryset(self):
    #     profile_id = self.kwargs['pk']
    #     return Profile.objects.filter(profile=profile_id)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AccountDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = AccountsSerializer

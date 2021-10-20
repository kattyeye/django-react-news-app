from django.shortcuts import render
from rest_framework import generics
from .models import Profile

from .serializers import AccountsSerializer
# Create your views here.


class AccountListAPIView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = AccountsSerializer


class AccountDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = AccountsSerializer

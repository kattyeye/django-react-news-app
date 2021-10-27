from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User
from rest_auth.serializers import UserDetailsSerializer


class AccountsSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = Profile
        fields = '__all__'


class UserDetailsSerializer(UserDetailsSerializer):
    class Meta(UserDetailsSerializer.Meta):
        fields = ("id", "username", "email",
                  "is_staff", "is_superuser",)

from rest_framework import serializers
from .models import Profile


class AccountsSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = Profile
        fields = '__all__'

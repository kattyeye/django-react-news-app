from django.urls import path, include
from . import views

app_name = "api_v1"

urlpatterns = [

    path('', views.AccountListAPIView.as_view(), name="accountlist"),
    path('<int:pk>/', views.AccountDetailAPIView.as_view(), name="account_detail"),
]

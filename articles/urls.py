from django.urls import path, include
from . import views

app_name = "articles"

urlpatterns = [


    path('', views.ArticleListAPIView.as_view(), name="article_list")
]

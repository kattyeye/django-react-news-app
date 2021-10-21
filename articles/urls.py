from django.urls import path, include
from . import views

app_name = "articles"

urlpatterns = [
    path('', views.ArticleHomePageListAPIView.as_view(), name="article_list"),
    # path('drafts/', views.ArticleDraftListAPIView.as_view(), name="draft_list"),
    # path('admin/', views.ArticleListAdminAPIView.as_view(), name="admin_list"),
    path('<int:pk>/', views.ArticleDetailAPIView.as_view(), name="article_list"),
]

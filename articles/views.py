from django.shortcuts import get_object_or_404  # used in perform_create to
from rest_framework import generics
from .models import Article
from .serializers import ArticleSerializer
from .permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
# Create your views here.


class ArticleHomePageListAPIView(generics.ListCreateAPIView):
    # queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)  # tuple

    def get_queryset(self):
        return Article.objects.filter(phase='PUB')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


# class ArticleDraftListAPIView(generics.ListCreateAPIView):
#     serializer_class = ArticleSerializer
#     permission_classes = (IsAuthenticatedOrReadOnly,)  # tuple

#     def get_queryset(self):
#         return Article.objects.filter(phase='DRA')

#     def perform_create(self, serializer):
#         serializer.save(author=self.request.user)


# class ArticleListAdminAPIView(generics.ListCreateAPIView):
#     # queryset = Article.objects.all()
#     serializer_class = ArticleSerializer
#     permission_classes = (IsAuthenticatedOrReadOnly,)  # tuple

#     def get_queryset(self):
#         return Article.objects.filter(phase='SUB')

#     def perform_create(self, serializer):
#         serializer.save(author=self.request.user)


class ArticleDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsAdminUser,)  # tuple

from rest_framework import generics
from .models import Article
from .serializers import ArticleSerializer
# from .permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticatedOrReadOnly
# Create your views here.


class ArticleListAPIView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)  # tuple


class ArticleDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    # permission_classes = (IsOwnerOrReadOnly,)  # tuple

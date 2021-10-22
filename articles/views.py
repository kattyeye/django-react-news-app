from django.shortcuts import get_object_or_404  # used in perform_create to
from rest_framework import generics
from .models import Article
from .serializers import ArticleSerializer
from .permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
# Create your views here.


class ArticleListAPIView(generics.ListCreateAPIView):

    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)  # tuple

    def get_queryset(self):
        # import pdb
        # pdb.set_trace()
        if not self.request.user.is_anonymous:
            queryset = Article.objects.all()
            phase_text = self.request.query_params.get('phase')
            if phase_text is not None:
                queryset = queryset.filter(
                    phase=phase_text, author=self.request.user)
            return queryset
        return Article.objects.filter(phase='PUB')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ArticleListAdminAPIView(generics.ListCreateAPIView):
    # queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsOwnerOrReadOnly,)  # tuple
    queryset = Article.objects.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ArticleDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    # queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    # permission_classes = (IsAdminUser)  # tuple

    def get_queryset(self):
        queryset = Article.objects.all()
        phase = self.request.query_params.get('sub')
        if phase is not None:
            queryset = queryset.filter(publishing_phase=phase)
        return queryset

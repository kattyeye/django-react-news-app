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
        queryset = Article.objects.all()
        phase_text = self.request.query_params.get('phase')
        # import pdb
        # pdb.set_trace()
        if phase_text is not None:
            queryset = queryset.filter(phase=phase_text)
        return queryset

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
    # queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsAdminUser,)  # tuple

    def get_queryset(self):
        queryset = Article.objects.all()
        phase = self.request.query_params.get('sub')
        if phase is not None:
            queryset = queryset.filter(publishing_phase=phase)
        return queryset

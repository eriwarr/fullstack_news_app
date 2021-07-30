from rest_framework import generics
from .models import Article
from .serializers import ArticleSerializer
from .permissions import IsAuthOrReadOnly
from django.shortcuts import render, get_object_or_404

class ArticleListView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class ArticleDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthOrReadOnly,)

class ArticleCategoryListView(generics.ListCreateAPIView):
    serializer_class = ArticleSerializer

    def get_queryset(self):
        selection = self.request.query_params['category']
        return Article.objects.filter(category=selection)

class UserArticleListAPIView(generics.ListCreateAPIView):
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthOrReadOnly,)

    def get_queryset(self):
        author = self.request.user
        return Article.objects.filter(author=author)

class UserArticleDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthOrReadOnly,)

    def get_queryset(self):
        author = self.request.user
        return Article.objects.filter(author=author)

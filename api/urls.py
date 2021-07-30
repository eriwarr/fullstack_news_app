from django.urls import include, path

urlpatterns = [
    path('users/', include('accounts.urls')),
    path('articles/', include('articles.urls')),
]

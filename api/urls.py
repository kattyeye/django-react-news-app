from django.urls import path, include


app_name = 'api_v1'
urlpatterns = [

    path('articles/', include('articles.urls', namespace="articles")),
    path('account/', include('accounts.urls', namespace="account")),
]

from django.urls import path
from django.conf.urls import url
from . import views

app_name = 'area'
urlpatterns = [
    path('', views.login, name='login'),
    url(r'^Home/', views.home),
    url(r'^Loader/', views.loading_page),
    url(r'^Register/', views.register),
    url(r'^Service/', views.service),
    url(r'^Page', views.page1),
]

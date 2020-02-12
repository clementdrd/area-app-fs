from django.urls import path
from django.conf.urls import url
from . import views

app_name = 'area'
urlpatterns = [
    path('', views.login, name='login'),
    path('Home/', views.home, name='home'),
    url(r'^Loader/', views.loading_page),
    url(r'^Register/', views.register),
    url(r'^Service/', views.service, name='service_connection'),
    url(r'^Page', views.page1),
]

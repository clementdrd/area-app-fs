from django.urls import path
from . import views

app_name = 'area'
urlpatterns = [
    path('', views.home, name='home')
]
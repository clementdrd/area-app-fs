from django.urls import path

from . import views

app_name = 'area'
urlpatterns = [
    path('', views.index, name='index')
]
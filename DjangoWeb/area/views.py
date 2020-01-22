from django.shortcuts import render
from django.views import generic
from django.template import loader
from django.http import HttpResponse
import requests
# Create your views here.

def home(request):
    response = requests.get('https://reqres.in/api/users?page=2')
    geodata = response.json()
    return render(request, 'index.html', {
        'ip': geodata,
    })

def loading_page(request):
    return render(request, 'loader.html')

def login(request):
    return render(request, 'login_page.html')

def register(request):
    return render(request, 'register_page.html')
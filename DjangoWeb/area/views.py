from django.shortcuts import render
from django.views import generic
from django.template import loader
from django.http import HttpResponse
import requests
# Create your views here.

def home(request):
    response = requests.get('https://reqres.in/api/users?page=2')
    geodata = response.json()
    return render(request, 'home.html', {
        'ip': geodata,
    })
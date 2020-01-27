from django.shortcuts import render
from django.views import generic
from django.template import loader
from django.http import HttpResponse
import requests
from django.conf import settings
from django.conf.urls.static import static
import os

# Create your views here.

def home(request):
    img_path = []
    path = settings.STATICFILES_DIRS[0] + "\\images" + "\\icon"
    searchID = []
    for root, dirs, files in os.walk(path):
        print(root)
        print(dirs)
        print(files)
        img_path = files
        searchID.append(str(files).replace('-icon.png', ''))
    for index, elem in enumerate(img_path):
        img_path[index] += path + "\\" + elem
    response = requests.get('https://area-rest-api-zuma.herokuapp.com/isonline')
    geodata = response.text
    # print(searchID)
    # print(img_path)
    return render(request, 'index.html', {
        'ip': geodata,
        'img_path': img_path,
        'searchID': searchID
    })

def loading_page(request):
    return render(request, 'loader.html')

def login(request):
    return render(request, 'login_page.html')

def register(request):
    return render(request, 'register_page.html')

def service(request):
    return render(request, 'service_connection.html')

def page1(request):
    return render(request, 'page1.html')
from django.shortcuts import render, redirect
from django.views import generic
from django.template import loader
from django.http import HttpResponse
import requests
from django.conf import settings
from django.conf.urls.static import static
from .forms import forms, RegisterForm, LoginForm
import requests 

import os

# Create your views here.

def home(request):
    img_path = []
    path = settings.STATICFILES_DIRS[0] + "\\images" + "\\icon"
    searchID = []
    for root, dirs, files in os.walk(path):
        img_path = files
        searchID.append(str(files).replace('-icon.png', ''))
    for index, elem in enumerate(img_path):
        img_path[index] += path + "\\" + elem
    # response = requests.get('https://area-rest-api-zuma.herokuapp.com/isonline')
    # geodata = response.text
    # print(searchID)
    # print(img_path)
    userToken = request.COOKIES.get('userToken')
    print(userToken)
    return render(request, 'index.html', {
        # 'ip': geodata,
        'img_path': img_path,
        'searchID': searchID,
        'nbOfImages': range(len(img_path)),
        'userToken': userToken
    })

def loading_page(request):
    return render(request, 'loader.html')

def login(request):
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = LoginForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            data = request.POST.copy()
            userName = data.get('userName')
            password = data.get('password')
            url = 'https://area-rest-api-zuma.herokuapp.com/login'
            myobj = {
                'username': userName,
                'password': password
            }
            x = requests.post(url, data=myobj)
            if x.status_code == 400:
                form.add_error("password", forms.ValidationError((x.text)))
                return render(request, 'login_page.html', {
                    'form': form
                })
            else:
                response = redirect('/Home')
                response.set_cookie('userToken', x.headers['userToken'])
                return response
        else:
            return render(request, 'register_page.html', {
                'form': form
            })

    # if a GET (or any other method) we'll create a blank form
    else:
        form = LoginForm()
    return render(request, 'login_page.html', {
        'form': form
    })

def register(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = RegisterForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            data = request.POST.copy()
            userName = data.get('userName')
            email = data.get('email')
            password = data.get('password')
            passwordVerif = data.get('passwordVerif')
            if password != passwordVerif:
                form.add_error(forms.ValidationError(('Les deux mots de passes ne sont pas identiques')))
            url = 'https://area-rest-api-zuma.herokuapp.com/register'
            myobj = {
                'username': userName,
                'password': password,
                'email': email
            }
            x = requests.post(url, data = myobj)
            print(x.text)
            return redirect('/')
        else:
            return render(request, 'register_page.html', {
                'form': form
            })

    # if a GET (or any other method) we'll create a blank form
    else:
        form = RegisterForm()
    return render(request, 'register_page.html', {
        'form': form
    })

def service(request):
    return render(request, 'service_connection.html')

def page1(request):
    return render(request, 'page1.html')
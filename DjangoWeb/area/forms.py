from django import forms

class RegisterForm(forms.Form):
    userName = forms.CharField(label='Username', max_length=100)
    password = forms.CharField(widget=forms.PasswordInput, label='Password', max_length=100)
    passwordVerif = forms.CharField(widget=forms.PasswordInput, label='Password', max_length=100)
    email = forms.CharField(label='Email', max_length=100)
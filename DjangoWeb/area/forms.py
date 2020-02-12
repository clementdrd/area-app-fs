from django import forms
import re 

class RegisterForm(forms.Form):
    def clean_email(self):
        email = self.cleaned_data['email']
        regex = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'
        if(re.search(regex, email)):
            return email
        else:
            raise forms.ValidationError('Veuillez indiquer une adresse mail valide')

    userName = forms.CharField(label='Username', max_length=100, required=True)
    email = forms.EmailField(label='Email', max_length=100, required=True)
    password = forms.CharField(widget=forms.PasswordInput, label='Password', max_length=100, required=True)
    passwordVerif = forms.CharField(widget=forms.PasswordInput, label='Password', max_length=100, required=True)

class LoginForm(forms.Form):

    userName = forms.CharField(label='Username', max_length=100, required=True)
    password = forms.CharField(widget=forms.PasswordInput, label='Password', max_length=100, required=True)
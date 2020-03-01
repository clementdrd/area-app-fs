package com.epitech.area;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.snackbar.Snackbar;

import java.io.IOException;

import android.util.Log;
import android.widget.ImageButton;

import com.microsoft.identity.client.AuthenticationCallback;
import com.microsoft.identity.client.IAuthenticationResult;
import com.microsoft.identity.client.exception.MsalClientException;
import com.microsoft.identity.client.exception.MsalException;
import com.microsoft.identity.client.exception.MsalServiceException;
import com.microsoft.identity.client.exception.MsalUiRequiredException;

import okhttp3.Callback;
import okhttp3.FormBody;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class UserConnect extends AppCompatActivity {

    public static UserData Connected = new UserData();
    private String returnValue = "test";
    private int RequestCode = 0 ;
    private boolean Register = false;
    private String Url = "https://area-rest-api-zuma.herokuapp.com/";
    private AuthenticationHelper mAuthHelper = null;


    OkHttpClient httpClient = new OkHttpClient.Builder().build();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (Register)
            RegisterUser();
        else
            ConnectUser();
        mAuthHelper = AuthenticationHelper.getInstance(getApplicationContext());

    }

    public void ConnectUser()
    {
        setContentView(R.layout.user_connect);
        Button clickButton = (Button) findViewById(R.id.Connectbutton);
        Button RegisterButton = (Button) findViewById(R.id.Register_button);

        clickButton.setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                boolean exit = false;
                EditText User = (EditText)findViewById(R.id.UsernameConnect);
                Connected.UserName = User.getText().toString();
                EditText Pass = (EditText)findViewById(R.id.passwordConnect);
                Connected.Password = Pass.getText().toString();
                if (Connected.UserName.isEmpty()) {
                    User.setError("Please Enter an Username");
                    exit = true;
                }
                if (Connected.Password.isEmpty()) {
                    Pass.setError("Please Enter a Password");
                    exit = true;
                }
                if (exit)
                    return;
                LogIn();
            }
        });
        RegisterButton.setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Register =  true;
                RegisterUser();
            }
        });
    }

    public void RegisterUser()
    {
        setContentView(R.layout.user_register);
        Button Validate = (Button) findViewById(R.id.Register_button);
        Validate.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                boolean exit = false;
                EditText User = (EditText)findViewById(R.id.UsernameRegister);
                Connected.UserName = User.getText().toString();
                EditText Pass = (EditText)findViewById(R.id.PasswordRegister);
                Connected.Password = Pass.getText().toString();
                EditText Email = (EditText)findViewById(R.id.EmailRegister);
                Connected.email = Email.getText().toString();
                if (Connected.email.isEmpty() || Connected.email.indexOf('@') != -1 ) {
                    Email.setError("Please Enter an Email");
                    exit = true;
                }
                if (Connected.UserName.isEmpty()) {
                    User.setError("Please Enter an Username");
                    exit = true;
                }
                if (Connected.Password.isEmpty()) {
                    Pass.setError("Please Enter a Password");
                    exit = true;
                }
                if (exit)
                    return;
                RegisterApi();
            }
        });
    }

    public void RegisterApi()
    {
        RequestBody formBody = new FormBody.Builder()
                .add("username", Connected.UserName)
                .add("password", Connected.Password)
                .add("email", Connected.email)
                .build();

        Request request = new Request.Builder()
                .url(Url+"register")
                .post(formBody)
                .build();

        httpClient.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(okhttp3.Call call, IOException e) {
                Log.e("ERR", "An error has occurred " + e);
            }

            @Override
            public void onResponse(okhttp3.Call call, Response response) throws IOException {
                returnValue = response.body().string();
                RequestCode = response.code();

                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        Snackbar snackbar = Snackbar.make(findViewById(R.id.ConnectContainer), returnValue, Snackbar.LENGTH_LONG);
                        snackbar.show();

                        if (RequestCode == 200) {
                            Log.e("test", Integer.toString(RequestCode));
                            Register = false;
                            ConnectUser();
                            SwitchActivity();
                        }
                        return;
                    }
                });
            }
        });
    }

    public void SwitchActivity()
    {
        Intent myIntent = new Intent(this,MainActivity.class);
        startActivity(myIntent);
    }
    public void LogIn()
    {
        RequestBody formBody = new FormBody.Builder()
                .add("username", Connected.UserName)
                .add("password", Connected.Password)
                .build();

        Request request = new Request.Builder()
                .url(Url+"login")
                .post(formBody)
                .build();

        httpClient.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(okhttp3.Call call, IOException e) {
                Log.e("ERR", "An error has occurred " + e);
            }

            @Override
            public void onResponse(okhttp3.Call call, Response response) throws IOException {
                returnValue = response.body().string();
                RequestCode = response.code();
                Connected.Token = response.header("userToken");


                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        Snackbar snackbar = Snackbar.make(findViewById(R.id.ConnectContainer), returnValue, Snackbar.LENGTH_LONG);
                        snackbar.show();

                        if (RequestCode == 200) {
                            Log.d("test", Integer.toString(RequestCode));
                            SwitchActivity();
                        }
                        return;
                    }
                });
            }
        });
    }
}

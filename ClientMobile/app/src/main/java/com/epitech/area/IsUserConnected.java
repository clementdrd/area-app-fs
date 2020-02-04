package com.epitech.area;

import android.util.Log;

import com.google.android.material.snackbar.Snackbar;

import java.io.IOException;

import okhttp3.Callback;
import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

import static com.epitech.area.MainActivity.Url;


public class IsUserConnected {
    boolean Google;
    boolean Office;
    OkHttpClient httpClient = new OkHttpClient.Builder().build();


    IsUserConnected(String Token)
    {
        Google = false;
        Office = false;
        GetAllServicesStatus(Token);
    }

    private void GetAllServicesStatus(String Token) {
        Request request = new Request.Builder()
                .url(Url + "getAllServices")
                .addHeader("usertoken", Token)  // add request headers
                .build();

        httpClient.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(okhttp3.Call call, IOException e) {
                Log.e("ERR", "An error has occurred " + e);

            }

            @Override
            public void onResponse(okhttp3.Call call, final Response response) throws IOException {
                int RequestCode = response.code();
                Log.d("Success", Integer.toString(RequestCode));
                Log.d("Success", response.body().string());
            }
        });
    }
}

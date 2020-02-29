package com.epitech.area.ui.home;


import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.widget.Toolbar;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.epitech.area.AuthenticationHelper;
import com.epitech.area.ContactApi;
import com.epitech.area.MainActivity;
import com.epitech.area.MyRecyclerViewAdapterService;
import com.epitech.area.R;
import com.google.android.material.navigation.NavigationView;
import com.google.android.material.snackbar.Snackbar;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.FormBody;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

import static com.epitech.area.MainActivity.Url;
import static com.epitech.area.UserConnect.Connected;
import static java.lang.System.in;

public class TrelloFragment extends Fragment implements MyRecyclerViewAdapterService.ItemClickListener {
    private static final String USER_NAME = "userName";
    private MyRecyclerViewAdapterService adapter;
    View homeView;
    private String mUserName;
    OkHttpClient httpClient = new OkHttpClient.Builder().build();


    public TrelloFragment() {

    }

    public static TrelloFragment createInstance(String userName) {
        TrelloFragment fragment = new TrelloFragment();

        // Add the provided username to the fragment's arguments
        Bundle args = new Bundle();
        args.putString(USER_NAME, userName);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mUserName = getArguments().getString(USER_NAME);
        }
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        homeView = inflater.inflate(R.layout.fragment_nasa, container, false);
        homeView.setBackgroundColor(Color.WHITE);
        createView();
        return homeView;
    }
    void createView()
    {
        ArrayList<String> animalNames = new ArrayList<>();
        animalNames.add("Create board on project creation");
        animalNames.add("Create project on board creation");
        animalNames.add("Create Organization on group creation");
        animalNames.add("Create group on organization creation");

        RecyclerView recyclerView = homeView.findViewById(R.id.RowRecycler);
        recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));
        adapter = new MyRecyclerViewAdapterService(getActivity(), animalNames);
        adapter.setClickListener(this);
        recyclerView.setAdapter(adapter);
    }

    @Override
    public void onItemClick(View view, int position) {
        Toast.makeText(getActivity(), "You clicked " + adapter.getItem(position) + " on row number " + position, Toast.LENGTH_SHORT).show();
        if (position == 0)
            ConnectGitlab("trello");
        else if (position == 1)
            ConnectGitlab("gitlab");
        else if (position == 2)
            ConnectGitlab("trelloGitlabOrga");
        else
            ConnectGitlab("gitlabTrelloOrga");

    }

    public void SendOrga(String req)
    {
        Request request = new Request.Builder()
                .url(Url+req)
                .addHeader("usertoken", Connected.Token)
                .build();

        httpClient.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(okhttp3.Call call, IOException e) {
                Log.e("ERR", "An error has occurred " + e);
            }

            @Override
            public void onResponse(okhttp3.Call call, Response response) throws IOException {
                Log.d("test", "onResponse: " + response.code());
            }
        });
    }

    public void TrelloGitlab()
    {
        Request request = new Request.Builder()
                .url(Url+"trelloGitlab")
                .addHeader("usertoken", Connected.Token)
                .build();

        httpClient.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(okhttp3.Call call, IOException e) {
                Log.e("ERR", "An error has occurred " + e);
            }

            @Override
            public void onResponse(okhttp3.Call call, Response response) throws IOException {
                Log.d("test", "onResponse: " + response.code());
            }
        });
    }

    public void GitlabTrello()
    {
        Request request = new Request.Builder()
                .url(Url+"gitlabTrello")
                .addHeader("usertoken", Connected.Token)
                .build();

        httpClient.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(okhttp3.Call call, IOException e) {
                Log.e("ERR", "An error has occurred " + e);
            }

            @Override
            public void onResponse(okhttp3.Call call, Response response) throws IOException {
                Log.d("test", "onResponse: " + response.code());
            }
        });
    }

    public void ConnectGitlab(final String mode)
    {
        WebView myWebView = new WebView(getContext());
        myWebView.clearCache(true);
        myWebView.getSettings().setJavaScriptEnabled(true);
        myWebView.loadUrl("https://gitlab.com/oauth/authorize?client_id=211e20b122dc89a8593c8b86ea7bd02b1242d09e264b8c9947577b8929f5a727&redirect_uri=https://area/&response_type=code&state=123&scope=api%20sudo");
        myWebView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri url = request.getUrl();
                if (url.toString().contains("https://area/?code=") == true) {
                    TreatGitlabConnect(url.toString(), mode);
                    return true;
                }
                return false;
            }
        });
    }

    public void TreatGitlabConnect(String url, String mode)
    {
        String[] tab = url.split("=");
        String token = tab[1].split("&")[0];
        getGitlabToken(token, mode);
        getActivity().setContentView(R.layout.fragment_nasa);
    }

    public void getGitlabToken(String code, final String mode)
    {
        Request request = new Request.Builder()
                .url("https://gitlab.com/oauth/token?client_id=211e20b122dc89a8593c8b86ea7bd02b1242d09e264b8c9947577b8929f5a727&redirect_uri=https://area/&code="+code+"&grant_type=authorization_code")
                .addHeader("usertoken", Connected.Token)
                .post(RequestBody.create(
                        MediaType.parse("text/x-markdown"), "test"))
                .build();

        httpClient.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(okhttp3.Call call, IOException e) {
                Log.e("ERR", "An error has occurred " + e);
            }

            @Override
            public void onResponse(okhttp3.Call call, Response response) throws IOException {
                JSONObject reader = null;
                try {
                    reader = new JSONObject(response.body().string());
                    //Log.e("test2",reader.getString("access_token"));
                    SendThirdPartyToken(reader.getString("access_token"), "Gitlab", mode);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
    }
    public void SendThirdPartyToken(String token, String Service, final String mode)
    {
        RequestBody formBody = new FormBody.Builder()
                .add("usertoken", Connected.Token)
                .add("servicename", Service)
                .add("value", token)
                .build();
        Log.d("test", token);
        Request request = new Request.Builder()
                .url(Url+"addAccessToken")
                .post(formBody)
                .build();

        httpClient.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(okhttp3.Call call, IOException e) {
                Log.e("ERR", "An error has occurred " + e);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                Log.d("Log", response.message());
                if (mode == "trello")
                    TrelloGitlab();
                else if (mode == "gitlab")
                    GitlabTrello();
                else
                    SendOrga(mode);
                openTrelloFragment("test");
            }
        });
    }
    public void openTrelloFragment(String userName) {
        TrelloFragment fragment = TrelloFragment.createInstance((userName));
        getActivity().getSupportFragmentManager().beginTransaction()
                .replace(R.id.fragment_container, fragment)
                .commit();
    }
}


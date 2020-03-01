package com.epitech.area;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Debug;
import android.view.MenuItem;
import android.view.View;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.epitech.area.ui.home.DropboxFragment;
import com.epitech.area.ui.home.FootballFragment;
import com.epitech.area.ui.home.GoogleFragment;
import com.epitech.area.ui.home.ImgurFragment;
import com.epitech.area.ui.home.NasaFragment;
import com.epitech.area.ui.home.OfficeFragment;
import com.epitech.area.ui.home.RedditFragment;
import com.epitech.area.ui.home.SpotifyFragment;
import com.epitech.area.ui.home.TrelloFragment;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.Task;
import com.google.android.material.navigation.NavigationView;
import android.util.Log;
import android.widget.Toast;

import com.google.android.material.snackbar.Snackbar;
import com.microsoft.identity.client.AuthenticationCallback;
import com.microsoft.identity.client.IAuthenticationResult;
import com.microsoft.identity.client.exception.MsalClientException;
import com.microsoft.identity.client.exception.MsalException;
import com.microsoft.identity.client.exception.MsalServiceException;
import com.microsoft.identity.client.exception.MsalUiRequiredException;

import java.io.IOException;
import java.util.ArrayList;

import okhttp3.Callback;
import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

import static com.epitech.area.UserConnect.Connected;

public class MainActivity extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener,MyRecyclerViewAdapter.ItemClickListener  {
    private DrawerLayout mDrawer;
    private NavigationView mNavigationView;
    private View mHeaderView;
    private boolean mIsSignedIn = false;
    private String mUserName = null;
    private String mUserEmail = null;
    private AuthenticationHelper mAuthHelper = null;
    public static String Url = "https://area-rest-api-zuma.herokuapp.com/";
    private IsUserConnected ConnectionStatus = new IsUserConnected(Connected.Token);
    MyRecyclerViewAdapter adapter;
   public static DrawableRessources Ressource = new DrawableRessources();


    OkHttpClient httpClient = new OkHttpClient.Builder().build();
    GoogleSignInClient mGoogleSignInClient;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        createViewtest();
    }

    void createViewtest()
    {
        setContentView(R.layout.activity_main);
        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(getString(R.string.google_client_id))
                .requestServerAuthCode(getString(R.string.google_client_id))
                .requestEmail()
                .build();
        mGoogleSignInClient = GoogleSignIn.getClient(this, gso);
        GetDrawabelRessources();
        // Set the toolbar
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        mDrawer = findViewById(R.id.drawer_layout);

        // Add the hamburger menu icon
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(this, mDrawer, toolbar,
                R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        mDrawer.addDrawerListener(toggle);
        toggle.syncState();

        mNavigationView = findViewById(R.id.nav_view);

        // Set user name and email
        mHeaderView = mNavigationView.getHeaderView(0);
        setSignedInState(mIsSignedIn);

        // Listen for item select events on menu
        mNavigationView.setNavigationItemSelectedListener(this);
        mAuthHelper = AuthenticationHelper.getInstance(getApplicationContext());
        createView();
    }
    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {
        // Load the fragment that corresponds to the selected item
        switch (menuItem.getItemId()) {
            case R.id.Office:
                signIn();
                break;
            case R.id.Google:
                signInGoogle();
                break;
            case R.id.Spotify:
                signInSpotify();
                break;
            case R.id.Pinterest:
                signInPinterest();
                break;
            case R.id.Nasa :
                OpenNasaFragment();
                break;
            case R.id.Imgur:
                signInImgur();
                break;
            case R.id.Reddit:
                signInReddit();
                break;
            case R.id.Trello:
                signInTrello();
                break;
            case R.id.Dropbox:
                signInDropbox();
                break;
            case R.id.Football :
                openFootballPage();
                break;
        }

        mDrawer.closeDrawer(GravityCompat.START);

        return true;
    }

    public void OpenNasaFragment()
    {
        NasaFragment fragment = NasaFragment.createInstance(("useless"));
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.fragment_container, fragment)
                .commit();
    }

    @Override
    public void onBackPressed() {
        if (mDrawer.isDrawerOpen(GravityCompat.START)) {
            mDrawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    public void signInDropbox()
    {
        WebView myWebView = new WebView(this);
        myWebView.clearCache(true);
        setContentView(myWebView);
        myWebView.getSettings().setJavaScriptEnabled(true);
        myWebView.loadUrl("https://www.dropbox.com/oauth2/authorize?client_id=yp5wl24jy9d6l8l&response_type=token&redirect_uri=http:%2F%2Flocalhost:8000%2F#");
        myWebView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri url = request.getUrl();
                Log.e("test", url.toString());
                if (url.toString().contains("http://localhost:8000/#access_token") == true) {
                    TreatDropboxConnect(url.toString());
                    return true;
                }
                return false;
            }
        });
    }

    public void openFootballPage()
    {
        FootballFragment fragment = FootballFragment.createInstance(("user"));
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.fragment_container, fragment)
                .commit();
    }

    public void TreatDropboxConnect(String url)
    {
        String[] tab = url.split("#");
        tab = tab[1].split("&");
        String token = tab[0].split("=")[1];
        Log.e("test", token);
        //tab = tab[1].split("#");
        //
        SendThirdPartyToken( token, "Dropbox");
        createViewtest();
        openDropboxFragment("test");
    }

    public void signInTrello()
    {
        WebView myWebView = new WebView(this);
        myWebView.clearCache(true);
        setContentView(myWebView);
        myWebView.getSettings().setJavaScriptEnabled(true);
        myWebView.loadUrl("https://trello.com/1/authorize/?key=51fa8f3fa712867ca344ee0bb04b1de0&name=area&response_type=token&expiration=never&callback_method=fragment&return_url=https://area/&scope=read,write");
        myWebView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri url = request.getUrl();
                Log.e("test", url.toString());
                if (url.toString().contains("https://area/#token") == true) {
                    TreatTrelloConnect(url.toString());
                    return true;
                }
                return false;
            }
        });
    }

    public void TreatTrelloConnect(String url)
    {
        String[] tab = url.split("=");
        Log.e("test", tab[1]);
        //tab = tab[1].split("#");
        //tab = tab[1].split("&");
        //String token = tab[0].split("=")[1];
        SendThirdPartyToken( tab[1], "Trello");
        createViewtest();
        openTrelloFragment("test");
    }

    public void signInReddit()
    {
        WebView myWebView = new WebView(this);
        myWebView.clearCache(true);
        setContentView(myWebView);
        myWebView.getSettings().setJavaScriptEnabled(true);
        myWebView.loadUrl("https://dribbble.com/oauth/authorize?client_id=f5f8a1979f1e7dc4cb0a06a8199e9b36db59a3f66733bff33ad44163a0d1e154&redirect_uri=http://127.0.0.1:8000/&scope=public+upload&state=123");
        myWebView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri url = request.getUrl();
                if (url.toString().contains("https://area/?code=") == true) {
                    TreatDriblleConnect(url.toString());
                    return true;
                }
                return false;
            }
        });
    }

    public void TreatDriblleConnect(String url)
    {
        String[] tab = url.split("=");
        String token = tab[1].split("&")[0];
        SendThirdPartyToken( token, "Dribble");
        createViewtest();
        openRedditFragment();
    }

    public void signInImgur()
    {
        WebView myWebView = new WebView(this);
        myWebView.clearCache(true);
        setContentView(myWebView);
        myWebView.getSettings().setJavaScriptEnabled(true);
        myWebView.loadUrl("https://api.imgur.com/oauth2/authorize?client_id=de77af01c452ff9&response_type=token&state=APPLICATION_STATE");
        myWebView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri url = request.getUrl();
                if (url.toString().contains("postman") == true) {
                    TreatImgurConnect(url.toString());
                    return true;
                }
                return false;
            }
        });
    }

    public void TreatImgurConnect(String url)
    {
        String[] tab = url.split("\\?");
        tab = tab[1].split("#");
        tab = tab[1].split("&");
        String token = tab[0].split("=")[1];
        SendThirdPartyToken( token, "Imgur");
        createViewtest();
        openImgurFragment("test");
    }

    public void signInSpotify()
    {
        WebView myWebView = new WebView(this);
        myWebView.clearCache(true);
        setContentView(myWebView);
        myWebView.getSettings().setJavaScriptEnabled(true);

        myWebView.loadUrl("https://accounts.spotify.com/authorize?client_id=f6349b82adab4d12a42520ae5f530830&redirect_uri=http:%2F%2Farea%2Fcallback&scope=user-read-currently-playing%20user-read-email%20user-top-read&response_type=token&state=123");

        myWebView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri url = request.getUrl();
                if (url.toString().contains("access_token") == true) {
                    TreatSpotifyConnect(url.toString());
                    return true;
                }
                return false;
            }
        });
    }

    public void signInPinterest()
    {
        WebView myWebView = new WebView(this);
        myWebView.clearCache(true);
        setContentView(myWebView);
        myWebView.getSettings().setJavaScriptEnabled(true);

        myWebView.loadUrl("https://api.pinterest.com/oauth/?" + "response_type=code&" +
                "redirect_uri=https://area/callback/&" +
                "client_id=5081137354220033854&" +
                "scope=read_public,write_public&" +
                "state=123");

        myWebView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri url = request.getUrl();
                Log.e("test", url.toString());
                if (url.toString().contains("access_token") == true) {
                    //TreatSpotifyConnect(url.toString());
                    return true;
                }
                return false;
            }
        });
    }


    public void TreatSpotifyConnect(String url)
    {
        Log.e("msg", url);
        String token = url.split("=")[1];
        token = token.split("&")[0];
        SendThirdPartyToken( token, "Spotify");
        createViewtest();
        openSpotifyFragment("test");
    }

    public void showProgressBar()
    {
        FrameLayout container = findViewById(R.id.fragment_container);
        ProgressBar progressBar = findViewById(R.id.progressbar);
        container.setVisibility(View.GONE);
        progressBar.setVisibility(View.VISIBLE);
    }

    public void hideProgressBar()
    {
        FrameLayout container = findViewById(R.id.fragment_container);
        ProgressBar progressBar = findViewById(R.id.progressbar);
        progressBar.setVisibility(View.GONE);
        container.setVisibility(View.VISIBLE);
    }

    // Update the menu and get the user's name and email
    private void setSignedInState(boolean isSignedIn) {
        mIsSignedIn = isSignedIn;
        // Set the user name and email in the nav drawer
        TextView userName = mHeaderView.findViewById(R.id.user_name);
        TextView userEmail = mHeaderView.findViewById(R.id.user_email);
        mUserName = Connected.UserName;
        mUserEmail = Connected.email;

        userName.setText(mUserName);
        userEmail.setText(mUserEmail);
    }
    public void openHomeFragment(String userName) {
        OfficeFragment fragment = OfficeFragment.createInstance(userName);
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.fragment_container, fragment)
                .commit();
    }
    public void openDropboxFragment(String userName) {
        DropboxFragment fragment = DropboxFragment.createInstance(userName);
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.fragment_container, fragment)
                .commit();
    }

    public void openGoogleFragment(String userName) {
        GoogleFragment fragment = GoogleFragment.createInstance((userName));
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.fragment_container, fragment)
                .commit();
    }
    public void openTrelloFragment(String userName) {
        TrelloFragment fragment = TrelloFragment.createInstance((userName));
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.fragment_container, fragment)
                .commit();
    }
    public void openSpotifyFragment(String userName) {
        SpotifyFragment fragment = SpotifyFragment.createInstance((userName));
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.fragment_container, fragment)
                .commit();
    }

    public void openImgurFragment(String userName) {
        ImgurFragment fragment = ImgurFragment.createInstance((userName));
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.fragment_container, fragment)
                .commit();
    }

    public void openRedditFragment()
    {
        RedditFragment fragment = RedditFragment.createInstance(("user"));
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.fragment_container, fragment)
                .commit();
    }

    private void signIn() {
        showProgressBar();
        doSilentSignIn();
    }

    private void signInGoogle() {
        Intent signInIntent = mGoogleSignInClient.getSignInIntent();
        startActivityForResult(signInIntent, 1);
    }
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        // Result returned from launching the Intent from GoogleSignInClient.getSignInIntent(...);
        if (requestCode == 1) {
            // The Task returned from this call is always completed, no need to attach
            // a listener.
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            handleSignInResult(task);
        }
    }

    private void handleSignInResult(Task<GoogleSignInAccount> completedTask) {
        try {
            GoogleSignInAccount account = completedTask.getResult(ApiException.class);
            SendThirdPartyToken(account.getServerAuthCode() , "Google");

        } catch (ApiException e) {
            Log.w("ERR", "signInResult:failed code=" + e.getStatusCode());
        }
    }

    // Silently sign in - used if there is already a
    // user account in the MSAL cache
    private void doSilentSignIn() {
        mAuthHelper.acquireTokenSilently(getAuthCallback());
    }

    // Prompt the user to sign in
    private void doInteractiveSignIn() {
        mAuthHelper.acquireTokenInteractively(this, getAuthCallback());
    }

    // Handles the authentication result
    public AuthenticationCallback getAuthCallback() {
        return new AuthenticationCallback() {

            @Override
            public void onSuccess(IAuthenticationResult authenticationResult) {
                // Log the token for debug purposes
                String accessToken = authenticationResult.getAccessToken();
                Log.d("AUTH", String.format("Access token: %s", accessToken));
                hideProgressBar();

                setSignedInState(true);
            }

            @Override
            public void onError(MsalException exception) {
                // Check the type of exception and handle appropriately
                if (exception instanceof MsalUiRequiredException) {
                    Log.d("AUTH", "Interactive login required");
                    doInteractiveSignIn();

                } else if (exception instanceof MsalClientException) {
                    if (exception.getErrorCode() == "no_current_account") {
                        Log.d("AUTH", "No current account, interactive login required");
                        doInteractiveSignIn();
                    } else {
                        // Exception inside MSAL, more info inside MsalError.java
                        Log.e("AUTH", "Client error authenticating", exception);
                    }
                } else if (exception instanceof MsalServiceException) {
                    // Exception when communicating with the auth server, likely config issue
                    Log.e("AUTH", "Service error authenticating", exception);
                }
                hideProgressBar();
            }

            @Override
            public void onCancel() {
                // User canceled the authentication
                Log.d("AUTH", "Authentication canceled");
                hideProgressBar();
            }
        };
    }

    public void SendThirdPartyToken(String token, String Service)
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
            public void onResponse(okhttp3.Call call, final Response response) throws IOException {
                final int RequestCode = response.code();
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        if (RequestCode == 200) {
                            hideProgressBar();
                            setSignedInState(true);
                        }
                        else {
                            try {
                                Snackbar snackbar = Snackbar.make(findViewById(R.id.drawer_layout), response.body().string(), Snackbar.LENGTH_LONG);
                                snackbar.show();
                            } catch (Exception e)
                            {
                            }
                        }
                        return;
                    }
                });
            }
        });
    }
    void createView()
    {
        ArrayList<String> animalNames = new ArrayList<>();
        animalNames.add("Google");
        animalNames.add("Office");
        animalNames.add("Imgur");
        animalNames.add("Spotify");
        animalNames.add("Nasa");
        animalNames.add("Dribble");
        animalNames.add("Trello");
        animalNames.add("Dropbox");
        animalNames.add("Football");
        RecyclerView recyclerView = findViewById(R.id.RowRecycler);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        adapter = new MyRecyclerViewAdapter(this, animalNames);
        adapter.setClickListener(this);
        recyclerView.setAdapter(adapter);

    }

    @Override
    public void onItemClick(View view, int position) {
        Toast.makeText(this, "You tested " + adapter.getItem(position) + " on row number " + position, Toast.LENGTH_SHORT).show();
        if (position == 0)
            signInGoogle();
        else if (position == 1)
            signIn();
        else if (position == 2)
            signInImgur();
        else if (position == 3)
            signInSpotify();
        else if (position == 4)
            OpenNasaFragment();
        else if (position == 5)
            signInReddit();
        else if (position == 6)
            signInTrello();
        else if (position == 7)
            signInDropbox();
        else if (position == 8)
            openFootballPage();
    }

    void GetDrawabelRessources()
    {
        int id = getResources().getIdentifier("com.epitech.area:drawable/googlelogo_36" , null, null);
        Ressource.GoogleId = id;
        id = getResources().getIdentifier("com.epitech.area:drawable/office_logo_36x36" , null, null);
        Ressource.OfficeId = id;
        id = getResources().getIdentifier("com.epitech.area:drawable/spotify_36" , null, null);
        Ressource.SpotifyId = id;
        id = getResources().getIdentifier("com.epitech.area:drawable/nasa_36" , null, null);
        Ressource.NasaId = id;
        id = getResources().getIdentifier("com.epitech.area:drawable/trello_icon" , null, null);
        Ressource.TrelloId = id;
        id = getResources().getIdentifier("com.epitech.area:drawable/imgur_icon" , null, null);
        Ressource.ImgurId = id;
        id = getResources().getIdentifier("com.epitech.area:drawable/dribble_icon" , null, null);
        Ressource.DribbleId = id;
        id = getResources().getIdentifier("com.epitech.area:drawable/dropbox_icon" , null, null);
        Ressource.DropboxId = id;
        id = getResources().getIdentifier("com.epitech.area:drawable/ball_icon" , null, null);
        Ressource.FootballId = id;

    }
}
package com.epitech.area.ui.home;


import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.epitech.area.MyRecyclerViewAdapterService;
import com.epitech.area.R;

import java.io.IOException;
import java.util.ArrayList;

import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import static com.epitech.area.MainActivity.Url;
import static com.epitech.area.UserConnect.Connected;

public class RedditFragment extends Fragment implements MyRecyclerViewAdapterService.ItemClickListener {
    private static final String USER_NAME = "userName";
    private MyRecyclerViewAdapterService adapter;
    View homeView;
    private String mUserName;
    OkHttpClient httpClient = new OkHttpClient.Builder().build();


    public RedditFragment() {

    }

    public static RedditFragment createInstance(String userName) {
        RedditFragment fragment = new RedditFragment();

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
        animalNames.add("Post Shots to IMGUR");

        RecyclerView recyclerView = homeView.findViewById(R.id.RowRecycler);
        recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));
        adapter = new MyRecyclerViewAdapterService(getActivity(), animalNames);
        adapter.setClickListener(this);
        recyclerView.setAdapter(adapter);
    }

    @Override
    public void onItemClick(View view, int position) {
        Toast.makeText(getActivity(), "You reddit " + adapter.getItem(position) + " on row number " + position, Toast.LENGTH_SHORT).show();
        if (position == 0)
            dribblePost();
    }

    public void dribblePost()
    {
        Request request = new Request.Builder()
                .url(Url+"dribblepost")
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
}


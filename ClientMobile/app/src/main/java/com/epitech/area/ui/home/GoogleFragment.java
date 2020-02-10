package com.epitech.area.ui.home;

import android.graphics.Color;
import android.os.Bundle;
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

import java.util.ArrayList;

public class GoogleFragment extends Fragment implements MyRecyclerViewAdapterService.ItemClickListener {
    private static final String USER_NAME = "userName";
    private MyRecyclerViewAdapterService adapter;
    View homeView;
    private String mUserName;

    public GoogleFragment() {

    }

    public static GoogleFragment createInstance(String userName) {
        GoogleFragment fragment = new GoogleFragment();

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
        homeView = inflater.inflate(R.layout.fragment_google, container, false);
        homeView.setBackgroundColor(Color.WHITE);
        createView();
        return homeView;
    }
    void createView()
    {
        ArrayList<String> animalNames = new ArrayList<>();
        animalNames.add("Google");
        animalNames.add("Google");
        RecyclerView recyclerView = homeView.findViewById(R.id.RowRecycler);
        recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));
        adapter = new MyRecyclerViewAdapterService(getActivity(), animalNames);
        adapter.setClickListener(this);
        recyclerView.setAdapter(adapter);

    }

    @Override
    public void onItemClick(View view, int position) {
        Toast.makeText(getActivity(), "You clicked " + adapter.getItem(position) + " on row number " + position, Toast.LENGTH_SHORT).show();
    }
}


package com.example.cinemood.service;

import com.example.cinemood.model.Watchlist;
import com.example.cinemood.repository.WatchlistRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WatchlistService {

    @Autowired
    private WatchlistRepository repository;

    public Watchlist addMovie(
            Watchlist movie){

        return repository.save(movie);
    }

    public List<Watchlist> getMovies(
            String email){

        return repository.findByUserEmail(email);
    }

    public void removeMovie(
            Long movieId,
            String email){

        repository.deleteByMovieIdAndUserEmail(
                movieId,email
        );
    }
}
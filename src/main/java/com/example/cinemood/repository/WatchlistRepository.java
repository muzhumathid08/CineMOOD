package com.example.cinemood.repository;

import com.example.cinemood.model.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WatchlistRepository
        extends JpaRepository<Watchlist,Long> {

    List<Watchlist> findByUserEmail(String userEmail);

    void deleteByMovieIdAndUserEmail(
            Long movieId,
            String userEmail
    );
}
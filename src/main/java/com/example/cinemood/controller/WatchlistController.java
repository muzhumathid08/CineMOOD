package com.example.cinemood.controller;

import com.example.cinemood.model.Watchlist;
import com.example.cinemood.service.WatchlistService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/watchlist")
@CrossOrigin(origins="*")
public class WatchlistController {

    @Autowired
    private WatchlistService service;

    @PostMapping("/add")
    public Watchlist addMovie(
            @RequestBody Watchlist movie){

        return service.addMovie(movie);
    }

    @GetMapping("/{email}")
    public List<Watchlist> getMovies(
            @PathVariable String email){

        return service.getMovies(email);
    }

    @DeleteMapping("/{movieId}/{email}")
    public void removeMovie(
            @PathVariable Long movieId,
            @PathVariable String email){

        service.removeMovie(movieId,email);
    }
}
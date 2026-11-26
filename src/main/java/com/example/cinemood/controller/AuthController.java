package com.example.cinemood.controller;

import com.example.cinemood.dto.LoginRequest;
import com.example.cinemood.model.User;
import com.example.cinemood.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")

@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody User user){

        return authService.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request){

        return authService.login(request);
    }
}
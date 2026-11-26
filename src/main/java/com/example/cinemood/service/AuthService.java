package com.example.cinemood.service;

import com.example.cinemood.dto.LoginRequest;
import com.example.cinemood.model.User;
import com.example.cinemood.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public String register(User user) {

        User existingUser =
                userRepository.findByEmail(user.getEmail());

        if(existingUser != null){
            return "User already exists!";
        }

        BCryptPasswordEncoder encoder =
                new BCryptPasswordEncoder();

        user.setPassword(
                encoder.encode(user.getPassword())
        );

        userRepository.save(user);

        return "Registration Successful";
    }

    public String login(LoginRequest request){

        User user =
                userRepository.findByEmail(request.getEmail());

        if(user == null){
            return "User not found";
        }

        BCryptPasswordEncoder encoder =
                new BCryptPasswordEncoder();

        if (encoder.matches(request.getPassword(), user.getPassword())) {
            return "Login Success";
        }

        return "Invalid Password";
    }
}
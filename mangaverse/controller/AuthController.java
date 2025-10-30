package com.mangaverse.controller;

import com.mangaverse.model.user.User;
import com.mangaverse.payload.JwtResponse;
import com.mangaverse.payload.LoginRequest;
import com.mangaverse.payload.SignupRequest;
import com.mangaverse.repository.UserRepository;
import com.mangaverse.security.JwtUtils;
import com.mangaverse.security.UserDetailsImpl;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();        

        // Return the JWT and user details in the response
        return ResponseEntity.ok(new JwtResponse(jwt, 
                                                 userDetails.getId(), 
                                                 userDetails.getUsername(), // This is the email
                                                 userDetails.getEmail()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        // Normalize email & username to avoid duplicates caused by casing/whitespace
        String email = signUpRequest.getEmail().trim().toLowerCase();
        String username = signUpRequest.getUsername().trim();

        logger.info("Attempting registration for email={}", email);

        if (userRepository.existsByEmailIgnoreCase(email)) {
            logger.info("Registration failed - email already in use: {}", email);
            return ResponseEntity
                    .badRequest()
                    .body("Error: Email is already in use!");
        }

        // Create new user's account
        User user = new User(username,
                             email,
                             encoder.encode(signUpRequest.getPassword()));

        try {
            userRepository.save(user);
        } catch (DataIntegrityViolationException e) {
            // This can happen if the unique constraint was violated at the DB level
            logger.error("Data integrity violation while registering user: {}", e.getMessage());
            return ResponseEntity.status(409).body("Error: Could not register user (possible duplicate)");
        }

        return ResponseEntity.ok("User registered successfully!");
    }
}


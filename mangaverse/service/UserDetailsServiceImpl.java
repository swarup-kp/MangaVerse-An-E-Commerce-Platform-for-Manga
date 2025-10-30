package com.mangaverse.service;

import com.mangaverse.model.user.User;
import com.mangaverse.repository.UserRepository;
import com.mangaverse.security.UserDetailsImpl; // --- NEW --- Import our custom UserDetailsImpl
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
       
    User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

        // --- THIS IS THE FIX ---
        // We now build and return our custom, detailed UserDetailsImpl object,
        // which contains all the necessary user info for the login to succeed.
        return UserDetailsImpl.build(user);
    }
}


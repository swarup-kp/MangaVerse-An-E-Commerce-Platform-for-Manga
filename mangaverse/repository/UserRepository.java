package com.mangaverse.repository;

import com.mangaverse.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // This method will find a user by their email address
    Optional<User> findByEmail(String email);

    // This method checks if a user with a given email already exists
    Boolean existsByEmail(String email);

    Optional<User> findByEmailIgnoreCase(String email);
    Boolean existsByEmailIgnoreCase(String email);
}

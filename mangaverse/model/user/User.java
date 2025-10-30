package com.mangaverse.model.user;

import jakarta.persistence.*;
import java.util.HashSet; // --- NEW ---
import java.util.Set;    // --- NEW ---

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;
    
    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    // --- NEW --- Store user roles
    // Use FetchType.EAGER to load roles immediately with the user
    // ElementCollection is suitable for simple collections like Strings
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    private Set<String> roles = new HashSet<>();


    // Constructors
    public User() {}

    // Updated constructor to accept roles (though usually set separately)
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        // By default, new users get the USER role
        this.roles.add("ROLE_USER");
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    // --- NEW --- Getter and Setter for roles
    public Set<String> getRoles() { return roles; }
    public void setRoles(Set<String> roles) { this.roles = roles; }
}


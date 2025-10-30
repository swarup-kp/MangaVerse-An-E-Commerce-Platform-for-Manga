package com.mangaverse.config;

import com.mangaverse.security.AuthTokenFilter;
// We need UserDetailsServiceImpl for the authentication provider setup
import com.mangaverse.service.UserDetailsServiceImpl; 

import org.springframework.beans.factory.annotation.Autowired; // Import Autowired
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod; 
import org.springframework.security.authentication.AuthenticationManager;
// Import DaoAuthenticationProvider
import org.springframework.security.authentication.dao.DaoAuthenticationProvider; 
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity; 
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity 
public class SecurityConfig {

    // Inject the UserDetailsService
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    
    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Explicitly configure the DaoAuthenticationProvider
    // This connects the UserDetailsService and PasswordEncoder
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll() 
                .requestMatchers(HttpMethod.GET, "/api/mangas", "/api/mangas/**").permitAll() 
                .requestMatchers("/api/profile/me").authenticated()
                // Secure manga write operations (Example: Require ADMIN role)
                // .requestMatchers(HttpMethod.POST, "/api/mangas").hasRole("ADMIN") 
                // .requestMatchers(HttpMethod.PUT, "/api/mangas/**").hasRole("ADMIN")
                // .requestMatchers(HttpMethod.DELETE, "/api/mangas/**").hasRole("ADMIN")
                // For now, let's require authentication for write operations
                 .requestMatchers(HttpMethod.POST, "/api/mangas").authenticated() 
                 .requestMatchers(HttpMethod.PUT, "/api/mangas/**").authenticated()
                 .requestMatchers(HttpMethod.DELETE, "/api/mangas/**").authenticated()
                .anyRequest().authenticated() // Secure everything else by default
            );
        
        // Register the authentication provider
        http.authenticationProvider(authenticationProvider());
        
        // Add the JWT filter before the standard login filter
        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
}


package com.mangaverse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class MangaverseApplication {

    public static void main(String[] args) {
        SpringApplication.run(MangaverseApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
                // --- FIX ---
                // This configuration allows requests from your React development server
                // to access any endpoint under /api/
                registry.addMapping("/api/**") // Allow all paths under /api
                        .allowedOrigins("http://localhost:5173") // The address of your React app
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD") // Allowed HTTP methods
                        .allowCredentials(true);
            }
        };
    }
}


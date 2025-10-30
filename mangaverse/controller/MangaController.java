package com.mangaverse.controller;

import com.mangaverse.model.Manga;
import com.mangaverse.repository.MangaRepository; // --- NEW --- Import repository
import org.springframework.beans.factory.annotation.Autowired; // --- NEW ---
import org.springframework.http.HttpStatus;       // --- NEW ---
import org.springframework.http.ResponseEntity; // --- NEW ---
import org.springframework.web.bind.annotation.*;     // --- NEW --- Import more annotations

import java.util.List;
import java.util.Optional; // --- NEW ---

@RestController
@RequestMapping("/api/mangas") // --- UPDATED --- Base path is now /api/mangas
public class MangaController {

    // --- NEW --- Inject the MangaRepository
    @Autowired
    private MangaRepository mangaRepository;

    // --- UPDATED --- Get all mangas from the database
    @GetMapping // Maps to GET /api/mangas
    public List<Manga> getAllMangas() {
        return mangaRepository.findAll();
    }

    // --- NEW --- Get a single manga by ID
    @GetMapping("/{id}") // Maps to GET /api/mangas/{id}
    public ResponseEntity<Manga> getMangaById(@PathVariable Long id) {
        Optional<Manga> manga = mangaRepository.findById(id);
        // Return the manga if found, otherwise return 404 Not Found
        return manga.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // --- NEW --- Create a new manga
    // Note: This endpoint is currently protected by SecurityConfig (requires authentication)
    @PostMapping // Maps to POST /api/mangas
    public ResponseEntity<Manga> createManga(@RequestBody Manga newManga) {
        // Ensure the ID is null/0 so the database generates a new one
        newManga.setId(0); 
        Manga savedManga = mangaRepository.save(newManga);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedManga);
    }

    // --- NEW --- Update an existing manga
    // Note: This endpoint is currently protected by SecurityConfig (requires authentication)
    @PutMapping("/{id}") // Maps to PUT /api/mangas/{id}
    public ResponseEntity<Manga> updateManga(@PathVariable Long id, @RequestBody Manga updatedManga) {
        return mangaRepository.findById(id)
                .map(existingManga -> {
                    // Update fields from the request body
                    existingManga.setTitle(updatedManga.getTitle());
                    existingManga.setAuthor(updatedManga.getAuthor());
                    existingManga.setImg(updatedManga.getImg());
                    existingManga.setDescription(updatedManga.getDescription());
                    existingManga.setPrice(updatedManga.getPrice());
                    existingManga.setCategory(updatedManga.getCategory());
                    // Save the updated manga
                    Manga savedManga = mangaRepository.save(existingManga);
                    return ResponseEntity.ok(savedManga);
                })
                .orElseGet(() -> ResponseEntity.notFound().build()); // Return 404 if not found
    }

    // --- NEW --- Delete a manga by ID
    // Note: This endpoint is currently protected by SecurityConfig (requires authentication)
    @DeleteMapping("/{id}") // Maps to DELETE /api/mangas/{id}
    public ResponseEntity<Void> deleteManga(@PathVariable Long id) {
        if (!mangaRepository.existsById(id)) {
            return ResponseEntity.notFound().build(); // Return 404 if not found
        }
        mangaRepository.deleteById(id);
        return ResponseEntity.noContent().build(); // Return 204 No Content on success
    }
}


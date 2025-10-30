package com.mangaverse.repository;

import com.mangaverse.model.Manga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MangaRepository extends JpaRepository<Manga, Long> {
    // Spring Data JPA provides implementations for common methods like:
    // findAll(), findById(), save(), deleteById(), etc.
    // We can add custom query methods here later if needed.
}

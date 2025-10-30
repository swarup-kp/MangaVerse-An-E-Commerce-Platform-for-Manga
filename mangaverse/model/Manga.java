package com.mangaverse.model;

import jakarta.persistence.*; // --- NEW --- Import JPA annotations

@Entity                 // --- NEW --- Mark this class as a database entity
@Table(name = "mangas") // --- NEW --- Specify the table name in the database
public class Manga {

    @Id                 // --- NEW --- Mark 'id' as the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // --- NEW --- Auto-increment the ID
    private long id;

    @Column(nullable = false, length = 100) // --- NEW --- Add constraints
    private String title;

    // --- NEW --- Added author field based on frontend MangaCard, make it optional
    @Column(length = 255)
    private String author;

    @Column(length = 500) // --- NEW --- Allow longer URLs
    private String img;

    @Lob // --- NEW --- Use Lob for potentially long descriptions
    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false) // --- NEW ---
    private double price;

    @Column(length = 50) // --- NEW ---
    private String category;

    // --- NEW --- JPA requires a no-argument constructor
    public Manga() {}

    // Constructor updated to include author
    public Manga(long id, String title, String author, String img, String description, double price, String category) {
        this.id = id;
        this.title = title;
        this.author = author; // Include author
        this.img = img;
        this.description = description;
        this.price = price;
        this.category = category;
    }

    // Getters and Setters (Ensure author getter/setter exists)
    public long getId() { return id; }
    public void setId(long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getAuthor() { return author; } // Added Getter
    public void setAuthor(String author) { this.author = author; } // Added Setter
    public String getImg() { return img; }
    public void setImg(String img) { this.img = img; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}


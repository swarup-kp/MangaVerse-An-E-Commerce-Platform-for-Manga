# 📖 MangaVerse — An E-Commerce Platform for Manga

**MangaVerse** is a modern, full-stack e-commerce web application built for manga enthusiasts.  
It features a beautiful, responsive front-end built with **React** and **TypeScript**, and a secure, robust **REST API back-end** powered by **Java**, **Spring Boot**, and **MySQL**.

This project includes a complete, end-to-end user authentication system using **JSON Web Tokens (JWTs)** and a **database-driven catalog** that can be managed via API.

---

## ✨ Core Features

- 🔐 **Full User Authentication** — Secure registration and login using Spring Security, password hashing (BCrypt), and JWTs.  
- 🧠 **Persistent Sessions** — Users remain logged in across page refreshes using tokens stored in localStorage and verified on the server.  
- 📚 **Dynamic Product Catalog** — The shop page fetches manga listings directly from the MySQL database (no hardcoded data).  
- 🛡️ **Secure Back-End API** — Built with Spring Boot, all sensitive endpoints are JWT-protected.  
- 🚫 **Protected Routes** — Restricted pages like Profile and Admin Panel redirect unauthorized users to the login page.  
- 🛒 **Shopping Cart** — Fully functional front-end cart using React Context API for state management.  
- 💻 **Responsive Design** — Modern, mobile-friendly UI using Tailwind CSS.  
- ⚙️ **Full-Stack CRUD Ready** — The API supports Create, Read, Update, and Delete operations for the manga catalog.

---

## 🛠️ Technology Stack

### ⚛️ Front-End (Vite + React)

- React 18 (with Hooks)  
- TypeScript  
- Vite (for a fast development environment)  
- React Router v6 (for navigation)  
- Tailwind CSS (for styling)  
- Axios (for REST API requests)  
- react-hot-toast (for user notifications)

### ☕ Back-End (Java + Spring Boot)

- Java 17  
- Spring Boot 3  
- Spring Security 6 (for JWT authentication and endpoint protection)  
- Spring Data JPA (for database interaction)  
- MySQL Database (as persistent data store)  
- Maven (for dependency management)  
- jjwt (for creating and validating JSON Web Tokens)

---

## 🚀 Getting Started

To run this project locally, you’ll need to set up both the **back-end server** and the **front-end client**.

---

### 🧩 Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or later)  
- **Java JDK 17** (or later)  
- **Maven**  
- **MySQL Server** (e.g., MySQL Community Server or XAMPP)

---

### ⚙️ 1. Back-End Setup (Spring Boot Server)

#### Navigate to the backend folder:
```bash
cd mangaverse/backend

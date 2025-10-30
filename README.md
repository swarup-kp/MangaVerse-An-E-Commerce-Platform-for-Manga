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

## 🏗️ Project Structure

```bash
Manga-Store/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/mangastore/
│   │   │   │   ├── controller/          # REST Controllers
│   │   │   │   ├── model/               # Entities (Manga, User, CartItem)
│   │   │   │   ├── repository/          # JPA Repositories
│   │   │   │   ├── service/             # Business Logic
│   │   │   │   └── MangaStoreApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties  # MySQL configuration
│   │   │       └── static/
│   └── pom.xml                            # Maven dependencies

├── frontend/
│   ├── src/
│   │   ├── components/                   # Reusable UI components
│   │   ├── context/                      # Global state (CartContext, AuthContext)
│   │   ├── pages/                        # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Shop.tsx
│   │   │   ├── Cart.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── AdminDashboard.tsx        # 🚧 Coming soon
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.ts

└── README.md
```
---

### 🧩 Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or later)  
- **Java JDK 17** (or later)  
- **Maven**  
- **MySQL Server** (e.g., MySQL Community Server or XAMPP)

---

## 🚧 Future Features

This project is a strong foundation. Here are the next steps planned for development:

- 🧑‍💼 **Complete the Admin Panel:**  
  Build out the UI in the Admin Panel to use the POST, PUT, and DELETE API endpoints.  
  This will allow an administrator to add, edit, and delete manga directly from the website.

- 🔐 **Role-Based Authorization:**  
  Implement a distinction between `ROLE_USER` and `ROLE_ADMIN`, ensuring only admins can access the Admin Panel and its powerful APIs.

- 💳 **Checkout & Order History:**  
  Build a full checkout process and add an **Order History** section to the user's profile page.

- 🔍 **Server-Side Filtering:**  
  Move the shop page's search and category filtering logic to the back-end to improve performance as the catalog grows.


---

## ⚙️ Setup Instructions

### 🖥️ Frontend (React + Vite + Tailwind CSS)

Navigate to the `frontend` folder:
```bash
   cd frontend
```
Install dependencies:

```bash
npm install
```
Start the development server:

```bash
npm run dev
```
Open your browser at:
```
http://localhost:5173
```

**⚙️ Backend (Spring Boot + MySQL)**

Navigate to the backend folder:

```
cd backend
```
Create a MySQL database:

```
CREATE DATABASE manga_store;
```
Update your application.properties file:
```
spring.datasource.url=jdbc:mysql://localhost:3306/manga_store
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
server.port=8080
```
Run the backend application:
```
mvn spring-boot:run
```
The API should now be running at:
```
http://localhost:8080
```

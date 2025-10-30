📖 MangaVerse-An-E-Commerce-Platform-for-Manga

MangaVerse is a modern, full-stack e-commerce web application built for manga enthusiasts. It features a beautiful, responsive front-end built with React and TypeScript, and a secure, robust REST API back-end powered by Java, Spring Boot, and MySQL.

This project includes a complete, end-to-end user authentication system using JSON Web Tokens (JWTs) and a database-driven catalog that can be managed via API.

✨ Core Features

Full User Authentication: Secure user registration and login system using Spring Security, password hashing (BCrypt), and JWTs.

Persistent Sessions: Users remain logged in across page refreshes using tokens stored in localStorage and a secure back-end verification endpoint.

Dynamic Product Catalog: The shop page fetches all manga listings directly from the MySQL database (not a hardcoded list).

Secure Back-End API: A robust REST API built with Spring Boot. All sensitive endpoints are protected and require a valid JWT.

Protected Routes: The front-end (e.g., Profile, Admin Panel) is protected, redirecting unauthorized users to the login page.

Shopping Cart: A fully functional front-end shopping cart using React Context for state management.

Responsive Design: A beautiful and modern UI built with Tailwind CSS that works on all device sizes.

Full-Stack CRUD Ready: The back-end API supports full Create, Read, Update, and Delete operations for the manga catalog.

🛠️ Technology Stack

This project is built with a modern, decoupled, full-stack architecture.

⚛️ Front-End (Vite + React)

React 18 (with Hooks)

TypeScript

Vite (for a fast development environment)

React Router v6 (for page navigation)

Tailwind CSS (for styling)

Axios (for all API requests)

react-hot-toast (for user notifications)

☕ Back-End (Java + Spring Boot)

Java 17

Spring Boot 3

Spring Security 6 (for JWT authentication and endpoint protection)

Spring Data JPA (for database interaction)

MySQL Database (as the persistent data store)

Maven (for dependency management)

jjwt (for creating and validating JSON Web Tokens)

🚀 Getting Started

To run this project locally, you will need to set up and run both the back-end server and the front-end client.

Prerequisites

Node.js (v18 or later)

Java JDK 17 (or later)

Maven

MySQL Server (e.g., MySQL Community Server or XAMPP)

1. Back-End Setup (Spring Boot Server)

Navigate to the backend folder:

cd mangaverse/backend


Set up the MySQL Database:

Open your MySQL client (e.g., MySQL Workbench, DBeaver).

Create a new, empty database: CREATE DATABASE mangaverse_db;

Configure the Back-End:

Open the file src/main/resources/application.properties.

Update the spring.datasource.password field with your MySQL password.

(Optional) Update the mangaverse.app.jwtSecret with your own unique, long, random string.

Run the Server:

You can run the application directly from your IDE (like VS Code or IntelliJ) by running the MangaverseApplication.java file.

Alternatively, you can run from the terminal using Maven:

mvn spring-boot:run


The server will start on http://localhost:8080. It will automatically create the users and mangas tables in your database.

2. Front-End Setup (React Client)

Open a new terminal.

Navigate to the frontend folder:

cd mangaverse/frontend


Install Dependencies:

npm install


Run the Development Server:

npm run dev


The React application will start on http://localhost:5173 (or a similar port).

Open the App!

Open http://localhost:5173 in your browser. You can now register a new user, log in, and browse the shop.

🚧 Future Features

This project is a strong foundation. Here are the next steps planned for development:

Complete the Admin Panel: Build out the UI in the Admin Panel to use the POST, PUT, and DELETE API endpoints. This will allow an administrator to add, edit, and delete manga directly from the website.

Role-Based Authorization: Implement a distinction between ROLE_USER and ROLE_ADMIN, ensuring only admins can access the Admin Panel and its powerful APIs.

Checkout & Order History: Build a full checkout process and add an "Order History" section to the user's profile page.

Server-Side Filtering: Move the shop page's search and category filtering logic to the back-end to improve performance as the catalog grows.

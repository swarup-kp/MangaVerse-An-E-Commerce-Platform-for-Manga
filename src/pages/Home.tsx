import React, { useState } from "react";
import { allMangas } from "../data/mangas";
import MangaCard from "../components/MangaCard";
// --- NEW --- Importing icons for the "Why Choose Us" and Carousel sections
import { BookOpen, Truck, Users, ChevronLeft, ChevronRight } from "lucide-react";

// Select a few mangas to feature on the home page
const featuredMangas = allMangas.slice(0, 8); // Increased for a better carousel experience

const Home: React.FC = () => {
  // State for the newsletter form
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  // --- NEW --- State for the carousel
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setSubscribed(true);
      setEmail("");
      // In a real app, you would send the email to a server here.
    }
  };
  
  // --- NEW --- Carousel navigation functions
  const prevSlide = () => {
    // This logic ensures the carousel loops smoothly
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? featuredMangas.length - 4 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex >= featuredMangas.length - 4; // Adjust based on number of visible cards
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="bg-gradient-to-b from-rose-50 via-amber-50 to-rose-100 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="text-center py-24 bg-gradient-to-r from-rose-200 via-pink-200 to-amber-200 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-rose-700 animate-fadeIn">
            Welcome to MangaVerse
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-6 text-rose-800 animate-fadeIn delay-200">
            Explore your favorite manga, shop online, and immerse yourself in Japanese aesthetics.
          </p>
          <a
            href="/shop"
            className="bg-rose-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-rose-600 transition animate-fadeIn delay-400 shadow-lg"
          >
            Start Shopping
          </a>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="bg-pink-300 w-72 h-72 rounded-full absolute -top-20 -left-20 mix-blend-multiply animate-pulse"></div>
          <div className="bg-amber-300 w-96 h-96 rounded-full absolute -bottom-28 -right-24 mix-blend-multiply animate-pulse"></div>
        </div>
      </section>

      {/* --- UPDATED --- Featured Manga Carousel Section */}
      <section className="container mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold mb-10 text-rose-700 text-center">Featured Manga</h2>
        <div className="relative">
          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform ease-out duration-500"
              style={{ transform: `translateX(-${currentIndex * (100 / 4)}%)` }} // Slides 4 cards at a time
            >
              {featuredMangas.map((manga) => (
                <div key={manga.id} className="w-1/4 flex-shrink-0 px-4">
                   <MangaCard manga={manga} />
                </div>
              ))}
            </div>
          </div>
          {/* Left Arrow */}
          <button onClick={prevSlide} className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white/50 hover:bg-white rounded-full p-2 shadow-md z-10">
             <ChevronLeft size={24} className="text-rose-700"/>
          </button>
          {/* Right Arrow */}
          <button onClick={nextSlide} className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white/50 hover:bg-white rounded-full p-2 shadow-md z-10">
            <ChevronRight size={24} className="text-rose-700"/>
          </button>
        </div>
      </section>

      {/* "Why Choose Us?" Section */}
      <section className="container mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold mb-10 text-rose-700 text-center">Why MangaVerse?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-rose-200 p-4 rounded-full mb-4">
              <BookOpen size={32} className="text-rose-700" />
            </div>
            <h3 className="text-xl font-semibold text-rose-800 mb-2">Curated Collections</h3>
            <p className="text-gray-600">Every manga is hand-picked by enthusiasts to ensure the highest quality stories and art.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-rose-200 p-4 rounded-full mb-4">
              <Truck size={32} className="text-rose-700" />
            </div>
            <h3 className="text-xl font-semibold text-rose-800 mb-2">Fast & Reliable Shipping</h3>
            <p className="text-gray-600">We provide fast and secure shipping to get your favorite manga to you safely.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-rose-200 p-4 rounded-full mb-4">
              <Users size={32} className="text-rose-700" />
            </div>
            <h3 className="text-xl font-semibold text-rose-800 mb-2">Vibrant Community</h3>
            <p className="text-gray-600">Join a growing community of manga lovers and share your passion with others.</p>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="text-center py-20 bg-amber-50">
        <h2 className="text-3xl font-bold mb-4 text-rose-700">Join Our Community</h2>
        <p className="mb-6 text-gray-700 max-w-lg mx-auto">
          Subscribe to our newsletter for the latest releases, special offers, and manga news!
        </p>
        {subscribed ? (
          <p className="text-green-600 font-semibold text-lg">Thank you for subscribing!</p>
        ) : (
          <form onSubmit={handleNewsletterSubmit} className="flex justify-center max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="px-4 py-3 rounded-l-lg text-gray-800 outline-none border border-rose-300 focus:ring-2 focus:ring-rose-500 flex-1"
            />
            <button
              type="submit"
              className="bg-rose-700 text-white px-6 py-3 rounded-r-lg font-medium hover:bg-rose-600 transition shadow-md"
            >
              Subscribe
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export default Home;


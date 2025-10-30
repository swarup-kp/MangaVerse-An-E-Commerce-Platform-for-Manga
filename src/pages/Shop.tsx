import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext"; // ✅ added import

// --- Type Definition ---
type Manga = {
  id: number;
  title: string;
  author: string;
  category: string;
  price: number;
  image: string;
  description: string;
  color: string;
};

// --- Reusable Manga Card Component ---
const MangaCard: React.FC<{ manga: Manga }> = ({ manga }) => {
  const { addToCart } = useCart(); // ✅ using global cart context

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 font-sans">
      {/* Top Section */}
      <div className={`h-52 ${manga.color} flex items-center justify-center p-4`}>
        <h2 className="text-white text-4xl font-bold text-center drop-shadow-md">
          {manga.title}
        </h2>
      </div>

      {/* Bottom Section */}
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold text-gray-900">{manga.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{manga.author}</p>
        <p className="text-sm text-gray-700 flex-grow mb-4">{manga.description}</p>

        {/* Price + Add Button */}
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
          <span className="text-2xl font-bold text-gray-900">₹{manga.price}</span>
          <button
            className="bg-pink-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors shadow-md hover:shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              addToCart({
                id: manga.id,
                title: manga.title,
                price: manga.price,
                img: manga.image,
                quantity: 1,
              });
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Shop Component ---
export default function App() {
  const [mangas, setMangas] = useState<Manga[]>([]);

  useEffect(() => {
    const sampleMangas: Manga[] = [
      { id: 1, title: "Naruto", author: "Masashi Kishimoto", category: "Action", price: 299, image: "/images/naruto.jpg", description: "A young ninja seeks recognition and dreams of becoming the strongest.", color: "bg-orange-500" },
      { id: 2, title: "One Piece", author: "Eiichiro Oda", category: "Adventure", price: 399, image: "/images/onepiece.jpg", description: "A pirate crew searches for the ultimate treasure, the 'One Piece'.", color: "bg-blue-600" },
      { id: 21, title: "Sailor Moon", author: "Naoko Takeuchi", category: "Fantasy", price: 349, image: "/images/sailormoon.jpg", description: "A magical girl fights evil by moonlight and wins love by daylight.", color: "bg-pink-500" },
      { id: 4, title: "AOT", author: "Hajime Isayama", category: "Dark Fantasy", price: 349, image: "/images/aot.jpg", description: "Humanity fights for survival against giant man-eating Titans.", color: "bg-gray-700" },
      { id: 3, title: "Death Note", author: "Tsugumi Ohba", category: "Thriller", price: 399, image: "/images/deathnote.jpg", description: "A notebook that grants the power to kill anyone whose name is written in it.", color: "bg-black" },
      { id: 5, title: "Demon Slayer", author: "Koyoharu Gotouge", category: "Action", price: 459, image: "/images/demonslayer.jpg", description: "Tanjiro seeks revenge against demons who destroyed his family.", color: "bg-teal-600" },
      { id: 6, title: "Spy x Family", author: "Tatsuya Endo", category: "Comedy", price: 429, image: "/images/spyxfamily.jpg", description: "A spy, assassin, and telepath form an unconventional family.", color: "bg-green-600" },
      { id: 7, title: "Jujutsu Kaisen", author: "Gege Akutami", category: "Action", price: 489, image: "/images/jujutsu.jpg", description: "A boy swallows a cursed object and becomes host to a powerful spirit.", color: "bg-red-700" },
      { id: 8, title: "Tokyo Ghoul", author: "Sui Ishida", category: "Horror", price: 499, image: "/images/tokyoghoul.jpg", description: "A college student becomes half-ghoul after a tragic encounter.", color: "bg-purple-800" },
      { id: 9, title: "Bleach", author: "Tite Kubo", category: "Supernatural", price: 499, image: "/images/bleach.jpg", description: "Ichigo gains Soul Reaper powers and fights evil spirits.", color: "bg-gray-800" },
      { id: 10, title: "Fullmetal Alchemist", author: "Hiromu Arakawa", category: "Adventure", price: 599, image: "/images/fma.jpg", description: "Two brothers use alchemy to search for the Philosopher’s Stone.", color: "bg-yellow-600" },
      { id: 11, title: "My Hero Academia", author: "Kohei Horikoshi", category: "Action", price: 469, image: "/images/mha.jpg", description: "A boy born without powers dreams of becoming a hero.", color: "bg-blue-500" },
      { id: 12, title: "Chainsaw Man", author: "Tatsuki Fujimoto", category: "Horror", price: 529, image: "/images/chainsawman.jpg", description: "A devil hunter merges with his pet demon to survive.", color: "bg-orange-700" },
      { id: 13, title: "Haikyuu!!", author: "Haruichi Furudate", category: "Sports", price: 449, image: "/images/haikyuu.jpg", description: "A passionate volleyball team aims for national glory.", color: "bg-orange-400" },
      { id: 14, title: "Dr. Stone", author: "Riichiro Inagaki", category: "Sci-Fi", price: 479, image: "/images/drstone.jpg", description: "A genius scientist rebuilds civilization after humanity turns to stone.", color: "bg-lime-600" },
      { id: 15, title: "Fairy Tail", author: "Hiro Mashima", category: "Fantasy", price: 519, image: "/images/fairytail.jpg", description: "A group of wizards embarks on epic guild adventures.", color: "bg-indigo-500" },
      { id: 16, title: "Black Clover", author: "Yūki Tabata", category: "Fantasy", price: 499, image: "/images/blackclover.jpg", description: "A boy without magic aims to become the Wizard King.", color: "bg-gray-900" },
      { id: 17, title: "Blue Lock", author: "Muneyuki Kaneshiro", category: "Sports", price: 469, image: "/images/bluelock.jpg", description: "An intense soccer training program to create Japan’s best striker.", color: "bg-blue-800" },
      { id: 18, title: "Boruto", author: "Ukyo Kodachi", category: "Action", price: 429, image: "/images/boruto.jpg", description: "The next generation of ninjas continues Naruto’s legacy.", color: "bg-yellow-400" },
      { id: 19, title: "Solo Leveling", author: "Chugong", category: "Fantasy", price: 559, image: "/images/sololeveling.jpg", description: "A weak hunter gains power to level up endlessly.", color: "bg-purple-600" },
      { id: 20, title: "One Punch Man", author: "ONE", category: "Comedy", price: 489, image: "/images/onepunchman.jpg", description: "A hero who can defeat any foe with a single punch.", color: "bg-red-500" },
    ];
    setMangas(sampleMangas);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        All Manga
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {mangas.map((manga) => (
          <MangaCard key={manga.id} manga={manga} />
        ))}
      </div>
    </div>
  );
}

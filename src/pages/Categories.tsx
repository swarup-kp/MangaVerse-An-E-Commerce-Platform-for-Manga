import React from "react";
import { useNavigate } from "react-router-dom";

type Category = {
  id: number;
  name: string;
  description: string;
  img: string;
};

// --- UPDATED --- Using more consistent placeholders
const categories: Category[] = [
  { id: 1, name: "Shonen", description: "Action-packed stories for a young male audience.", img: "https://placehold.co/400x300/F97316/FFFFFF?text=Shonen" },
  { id: 2, name: "Shojo", description: "Romantic and drama stories for a young female audience.", img: "https://placehold.co/400x300/EC4899/FFFFFF?text=Shojo" },
  { id: 3, name: "Seinen", description: "Mature stories with complex themes for adult men.", img: "https://placehold.co/400x300/78716C/FFFFFF?text=Seinen" },
  { id: 4, name: "Josei", description: "Mature stories with realistic romance for adult women.", img: "https://placehold.co/400x300/8B5CF6/FFFFFF?text=Josei" },
  { id: 5, name: "Fantasy", description: "Magical worlds, adventures, and epic battles.", img: "https://placehold.co/400x300/14B8A6/FFFFFF?text=Fantasy" },
  { id: 6, name: "Mystery", description: "Thrilling stories full of suspense and intrigue.", img: "https://placehold.co/400x300/4B5563/FFFFFF?text=Mystery" },
];

const Categories: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-rose-50 via-amber-50 to-rose-100 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-rose-200 via-pink-200 to-amber-200 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-rose-700">
            Explore Manga Categories
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-6 text-rose-800">
            Find manga based on your favorite genres and styles.
          </p>
          <a
            href="/shop"
            className="bg-rose-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-rose-600 transition shadow-md"
          >
            Start Shopping
          </a>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto py-16 px-6">
        <h2 className="text-4xl font-bold mb-12 text-rose-700 text-center">
          Our Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer"
              onClick={() => navigate(`/shop?category=${cat.name}`)}
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 text-center">
                <h3 className="text-xl font-semibold text-rose-800">{cat.name}</h3>
                <p className="text-gray-600 mt-2 text-sm">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Categories;

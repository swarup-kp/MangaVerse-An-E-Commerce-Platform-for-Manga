import React from "react";
import { useCart } from "../context/CartContext";
import { type Manga } from "../data/mangas"; // Use the centralized Manga type

const MangaCard: React.FC<{ manga: Manga }> = ({ manga }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 flex flex-col">
      <img
        src={manga.img}
        alt={manga.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-lg text-rose-800">{manga.title}</h3>
        <p className="text-gray-500 text-sm">{manga.author}</p>
        <p className="text-gray-600 mt-2 flex-1 text-sm">{manga.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="font-bold text-rose-600 text-lg">₹{manga.price}</span>
          <button
            onClick={() => addToCart(manga)}
            className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-500 transition shadow-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MangaCard;

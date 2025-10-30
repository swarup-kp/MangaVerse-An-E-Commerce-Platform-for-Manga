import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // Import useAuth
import { ShoppingCart, Menu, X, User } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { totalItems } = useCart();
  const { isAuthenticated, logout } = useAuth(); // Get auth state
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <nav className="bg-rose-50 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-rose-600">MangaVerse</Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 text-lg text-rose-800 font-medium">
          <li><Link to="/" className="hover:text-rose-400 transition">Home</Link></li>
          <li><Link to="/shop" className="hover:text-rose-400 transition">Shop</Link></li>
          <li><Link to="/categories" className="hover:text-rose-400 transition">Categories</Link></li>
          <li><Link to="/about" className="hover:text-rose-400 transition">About</Link></li>
        </ul>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="hidden md:block">
            <input
              type="text"
              placeholder="Search Manga..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 rounded-lg text-gray-800 outline-none border border-rose-300 focus:ring-2 focus:ring-rose-500"
            />
          </form>
          <Link to="/cart" className="relative">
            <ShoppingCart size={24} className="text-rose-800" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-xs px-1 rounded-full text-white">{totalItems}</span>
            )}
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="hidden md:flex items-center space-x-1 p-2 rounded-full hover:bg-rose-100 transition">
                  <User size={18} />
              </Link>
              <button onClick={handleLogout} className="hidden md:block bg-red-400 hover:bg-red-300 px-4 py-2 rounded-lg text-sm font-medium text-white transition">
                  Sign Out
              </button>
            </>
          ) : (
            <Link to="/login" className="hidden md:flex items-center space-x-1 bg-rose-400 hover:bg-rose-300 px-4 py-2 rounded-lg text-sm font-medium text-white transition">
              <User size={18} /><span>Sign In</span>
            </Link>
          )}
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} className="text-rose-800" /> : <Menu size={24} className="text-rose-800" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <ul className="md:hidden bg-rose-100 text-rose-800 px-6 py-4 space-y-3 rounded-b-lg shadow-lg">
          <li><Link to="/" className="hover:text-rose-400 transition">Home</Link></li>
          <li><Link to="/shop" className="hover:text-rose-400 transition">Shop</Link></li>
          <li><Link to="/categories" className="hover:text-rose-400 transition">Categories</Link></li>
          <li><Link to="/about" className="hover:text-rose-400 transition">About</Link></li>
          {isAuthenticated ? (
            <>
             <li><Link to="/profile" className="flex items-center space-x-2 hover:text-rose-400 transition"><User size={18}/><span>Profile</span></Link></li>
             <li><button onClick={handleLogout} className="w-full text-left">Sign Out</button></li>
            </>
          ) : (
             <li><Link to="/login" className="flex items-center space-x-2 hover:text-rose-400 transition"><User size={18} /><span>Sign In</span></Link></li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

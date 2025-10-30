import React from "react";
import { useCart } from "../context/CartContext";
import { X, Plus, Minus } from "lucide-react";

const Cart: React.FC = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart, // --- NEW --- Get clearCart from context
    totalItems,
    totalPrice,
  } = useCart();

  // --- NEW --- Handle clearing the cart with confirmation
  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to remove all items from your cart?")) {
      clearCart();
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-rose-50 via-amber-50 to-rose-100 p-6">
        <h1 className="text-3xl font-bold text-rose-700 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-700 mb-6">Add some manga from the Shop page to get started!</p>
        <a
          href="/shop"
          className="bg-rose-700 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition shadow-md"
        >
          Go to Shop
        </a>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-rose-50 via-amber-50 to-rose-100 min-h-screen p-6 font-sans">
      <h1 className="text-4xl font-bold text-rose-700 mb-8 text-center">Your Cart</h1>
      
      <div className="max-w-4xl mx-auto space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-xl p-4 flex items-center hover:shadow-2xl transition"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-20 h-28 object-cover rounded-lg mr-4"
            />
            <div className="flex-1">
              <h2 className="font-semibold text-lg text-rose-800">{item.title}</h2>
              <p className="font-bold text-rose-600 mt-1">₹{item.price}</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => decreaseQuantity(item.id)}
                className="bg-rose-100 p-1 rounded-full hover:bg-rose-200 transition"
              >
                <Minus size={16} />
              </button>
              <span className="font-semibold w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => increaseQuantity(item.id)}
                className="bg-rose-100 p-1 rounded-full hover:bg-rose-200 transition"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="w-24 text-right font-bold text-rose-600">
              ₹{(item.price * item.quantity).toFixed(2)}
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-400 ml-4"
            >
              <X size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Totals Section */}
      <div className="mt-8 max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center bg-white rounded-2xl shadow-xl p-6 space-y-4 md:space-y-0">
        <div className="text-lg font-semibold text-rose-800">
          <p>Total Items: {totalItems}</p>
          <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={handleClearCart}
            className="bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-400 transition shadow-md"
          >
            Clear Cart
          </button>
          <button
            onClick={() => alert("Checkout feature is coming soon!")}
            className="bg-rose-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-rose-600 transition shadow-md"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

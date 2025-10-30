import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, ShoppingBag, Settings, Edit, Save, XCircle } from 'lucide-react';

// --- NEW --- Sample data for a more realistic order history
const sampleOrders = [
  { id: 'MVS-1024', date: '2025-09-22', total: 698, status: 'Shipped' },
  { id: 'MVS-1017', date: '2025-09-15', total: 349, status: 'Delivered' },
];

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // --- NEW --- State for handling the edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // --- NEW --- Handlers for the edit functionality
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // In a real app, you would make an API call here to update the user data.
    // For now, we'll just log it and exit edit mode.
    console.log("Saving data:", formData);
    // You might want to update the user in your AuthContext as well.
    setIsEditing(false);
  };

  const handleCancel = () => {
    // --- FIX --- Added a check to ensure 'user' exists before accessing its properties.
    // This prevents a potential crash if the user data is null.
    if (user) {
      setFormData({ username: user.username, email: user.email });
    }
    setIsEditing(false);
  };

  return (
    <div className="bg-gradient-to-b from-rose-50 via-amber-50 to-rose-100 min-h-screen p-6 font-sans">
      <div className="container mx-auto max-w-4xl">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center bg-white p-8 rounded-2xl shadow-xl mb-8">
          <div className="bg-rose-200 p-4 rounded-full mb-4 sm:mb-0 sm:mr-6">
            <User size={48} className="text-rose-700" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-rose-800 text-center sm:text-left">
              Welcome, {formData.username}!
            </h1>
            <p className="text-gray-600 text-center sm:text-left">{formData.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 sm:mt-0 sm:ml-auto flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition shadow-sm font-medium"
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </button>
        </div>

        {/* Profile Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* --- UPDATED --- Order History with sample data */}
          <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
            <h2 className="text-2xl font-semibold text-rose-800 mb-4 flex items-center">
              <ShoppingBag size={24} className="mr-3 text-rose-600" />
              Order History
            </h2>
            <div className="space-y-4">
              {sampleOrders.map(order => (
                <div key={order.id} className="border-b border-gray-200 pb-3 last:border-b-0">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-gray-600">Total: ₹{order.total}</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- UPDATED --- Account Settings with Edit Mode */}
          <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
            <h2 className="text-2xl font-semibold text-rose-800 mb-4 flex items-center">
              <Settings size={24} className="mr-3 text-rose-600" />
              Account Settings
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-700 font-medium">Username:</p>
                {isEditing ? (
                  <input type="text" name="username" value={formData.username} onChange={handleInputChange} className="font-medium text-gray-800 border rounded px-2 py-1 w-2/3" />
                ) : (
                  <p className="font-medium text-gray-800">{formData.username}</p>
                )}
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-700 font-medium">Email:</p>
                {isEditing ? (
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="font-medium text-gray-800 border rounded px-2 py-1 w-2/3" />
                ) : (
                  <p className="font-medium text-gray-800">{formData.email}</p>
                )}
              </div>
              {isEditing ? (
                <div className="flex gap-4 mt-4">
                  <button onClick={handleSave} className="w-full flex justify-center items-center bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"><Save size={18} className="mr-2" />Save</button>
                  <button onClick={handleCancel} className="w-full flex justify-center items-center bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"><XCircle size={18} className="mr-2" />Cancel</button>
                </div>
              ) : (
                <button onClick={() => setIsEditing(true)} className="w-full mt-4 flex justify-center items-center bg-rose-100 text-rose-800 py-2 rounded-lg hover:bg-rose-200 transition">
                  <Edit size={18} className="mr-2" />Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;


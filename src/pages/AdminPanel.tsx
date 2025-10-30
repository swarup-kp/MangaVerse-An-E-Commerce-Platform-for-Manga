import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig'; // Use our configured axios instance
import { type Manga } from '../data/mangas'; // Use the Manga type
import { Edit, Trash2, PlusCircle, XCircle, Save } from 'lucide-react'; // Added icons
import toast from 'react-hot-toast'; // Import toast for notifications

// Initial empty state for the manga form
const initialMangaState: Omit<Manga, 'id'> = {
    title: '',
    author: '',
    img: '',
    description: '',
    price: 0,
    category: '',
};

const AdminPanel: React.FC = () => {
    const [mangas, setMangas] = useState<Manga[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // --- NEW --- State for managing the Add/Edit Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentManga, setCurrentManga] = useState<Omit<Manga, 'id'>>(initialMangaState);
    const [isSubmitting, setIsSubmitting] = useState(false);


    // Fetch mangas when the component mounts
    const fetchMangas = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.get('/mangas');
            setMangas(response.data);
        } catch (err) {
            console.error("Error fetching mangas:", err);
            setError("Failed to load mangas. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMangas();
    }, []);

    // --- NEW --- Open the modal for adding a new manga
    const handleAddMangaClick = () => {
        setCurrentManga(initialMangaState); // Reset form
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // --- NEW --- Handle input changes in the form
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCurrentManga(prev => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) || 0 : value, // Ensure price is a number
        }));
    };

    // --- NEW --- Handle form submission (Create Manga)
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Make POST request to the backend
            const response = await api.post('/mangas', currentManga);
            // Add the new manga to the state to update the table immediately
            setMangas(prev => [...prev, response.data]);
            toast.success(`Manga "${response.data.title}" added successfully!`);
            handleCloseModal(); // Close modal on success
        } catch (err) {
            console.error("Error adding manga:", err);
            toast.error("Failed to add manga. Please check the details.");
            // Keep modal open on error
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleEditManga = (id: number) => {
        alert(`Edit Manga ID: ${id} functionality coming soon!`);
        // We will implement this later: Fetch manga by id, set currentManga, open modal
    };

    const handleDeleteManga = async (id: number) => {
         if (window.confirm(`Are you sure you want to delete manga with ID: ${id}?`)) {
            try {
                await api.delete(`/mangas/${id}`);
                setMangas(mangas.filter(manga => manga.id !== id));
                toast.success(`Manga ID: ${id} deleted successfully!`); // Use toast
            } catch (err) {
                 console.error("Error deleting manga:", err);
                 toast.error(`Failed to delete manga ID: ${id}.`); // Use toast
            }
         }
    };


    return (
        <div className="bg-gradient-to-b from-gray-100 via-gray-50 to-white min-h-screen p-6 font-sans">
            <div className="container mx-auto max-w-6xl">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Admin Panel - Manage Manga</h1>

                {/* Add Manga Button */}
                <div className="mb-6 text-right">
                    <button
                        onClick={handleAddMangaClick} // Use the new handler
                        className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-500 transition shadow-sm inline-flex items-center"
                    >
                        <PlusCircle size={18} className="mr-2" />
                        Add New Manga
                    </button>
                </div>

                {/* Manga Table */}
                <div className="bg-white rounded-2xl shadow-xl overflow-x-auto"> {/* Added overflow-x-auto */}
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {/* Table body remains the same */}
                            {isLoading ? (
                                <tr><td colSpan={6} className="text-center py-4 text-gray-500">Loading mangas...</td></tr>
                            ) : error ? (
                                <tr><td colSpan={6} className="text-center py-4 text-red-500">{error}</td></tr>
                            ) : mangas.length === 0 ? (
                                <tr><td colSpan={6} className="text-center py-4 text-gray-500">No mangas found. Click 'Add New Manga' to start!</td></tr>
                            ) : (
                                mangas.map((manga) => (
                                    <tr key={manga.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{manga.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{manga.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{manga.author || 'N/A'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{manga.price ? manga.price.toFixed(2) : '0.00'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{manga.category}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                                            <button onClick={() => handleEditManga(manga.id)} className="text-indigo-600 hover:text-indigo-900" title="Edit">
                                                <Edit size={18} />
                                            </button>
                                            <button onClick={() => handleDeleteManga(manga.id)} className="text-red-600 hover:text-red-900" title="Delete">
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- NEW --- Add/Edit Manga Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"> {/* Added max-h and overflow */}
                        <form onSubmit={handleFormSubmit}>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold text-gray-800">Add New Manga</h2>
                                    <button type="button" onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                                        <XCircle size={24} />
                                    </button>
                                </div>

                                {/* Form Fields */}
                                <div className="space-y-4">
                                    {/* Title */}
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                        <input type="text" name="title" id="title" value={currentManga.title} onChange={handleInputChange} required className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                                    </div>
                                    {/* Author */}
                                    <div>
                                        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                                        <input type="text" name="author" id="author" value={currentManga.author} onChange={handleInputChange} className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                                    </div>
                                    {/* Image URL */}
                                    <div>
                                        <label htmlFor="img" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                        <input type="url" name="img" id="img" value={currentManga.img} onChange={handleInputChange} required placeholder="https://..." className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                                    </div>
                                    {/* Description */}
                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea name="description" id="description" value={currentManga.description} onChange={handleInputChange} rows={3} required className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                                    </div>
                                    {/* Price */}
                                    <div>
                                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                                        <input type="number" name="price" id="price" value={currentManga.price} onChange={handleInputChange} required min="0" step="0.01" className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                                    </div>
                                    {/* Category */}
                                    <div>
                                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                        <select name="category" id="category" value={currentManga.category} onChange={handleInputChange} required className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                            <option value="">Select Category</option>
                                            <option value="Shonen">Shonen</option>
                                            <option value="Shojo">Shojo</option>
                                            <option value="Seinen">Seinen</option>
                                            <option value="Josei">Josei</option>
                                            <option value="Fantasy">Fantasy</option>
                                            <option value="Mystery">Mystery</option>
                                            {/* Add more categories as needed */}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg">
                                <button type="button" onClick={handleCloseModal} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition shadow-sm inline-flex items-center disabled:bg-indigo-300"
                                >
                                    <Save size={18} className="mr-2" />
                                    {isSubmitting ? 'Saving...' : 'Save Manga'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;


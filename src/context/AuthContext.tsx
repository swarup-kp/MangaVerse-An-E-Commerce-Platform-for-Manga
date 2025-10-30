import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import toast from "react-hot-toast";
import api from "../api/axiosConfig"; // Import our configured axios instance

// Types
type User = {
    id: number;
    username: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean; // --- NEW --- To handle initial session check
    login: (credentials: {email: string, password?: string}) => Promise<void>;
    register: (details: {username: string, email: string, password?: string}) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem("mangaverse_token"));
    const [isLoading, setIsLoading] = useState(true); // Start with loading state

    // --- THIS IS THE FIX ---
    // This effect now makes a secure API call to the backend to verify the token.
    useEffect(() => {
        const verifyUserSession = async () => {
            const storedToken = localStorage.getItem("mangaverse_token");
            if (storedToken) {
                try {
                    // The axios interceptor automatically adds the token to this request's header.
                    const response = await api.get('/profile/me');
                    // If the request is successful, the token is valid.
                    setUser(response.data);
                } catch (error) {
                    // If the request fails (e.g., a 401 error), the token is invalid or expired.
                    console.error("Session verification failed, logging out:", error);
                    // Clear out the invalid data.
                    localStorage.removeItem("mangaverse_token");
                    setToken(null);
                    setUser(null);
                }
            }
            setIsLoading(false); // Stop loading once the check is complete
        };
        verifyUserSession();
    }, []); // The empty array ensures this runs only once when the app first loads.

    const login = async (credentials: {email: string, password?: string}) => {
        try {
            const response = await api.post('/auth/login', credentials);
            
            const { token: receivedToken, ...userData } = response.data;
            
            setToken(receivedToken);
            setUser(userData);

            localStorage.setItem("mangaverse_token", receivedToken);
            // We store the user data separately for convenience, though it's not strictly necessary.
            localStorage.setItem("mangaverse_user", JSON.stringify(userData));

            toast.success("Login successful!");
        } catch (error) {
            toast.error("Login failed. Please check your credentials.");
            throw error;
        }
    };

    const register = async (details: {username: string, email: string, password?: string}) => {
        try {
            await api.post('/auth/register', details);
            toast.success("Registration successful! Please log in.");
        } catch (error) {
            toast.error("Registration failed. The email may already be in use.");
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("mangaverse_token");
        localStorage.removeItem("mangaverse_user");
        toast.success("Logged out successfully.");
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, isLoading, login, register, logout }}>
            {/* Don't render children until the session check is complete */}
            {!isLoading && children}
        </AuthContext.Provider>
    );
};


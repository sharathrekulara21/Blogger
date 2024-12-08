import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Create the context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);

	const login = (token) => {
		try {
			const decoded = jwtDecode(token);
			console.log("Decoded token:", decoded);
			setToken(token);
			localStorage.setItem("authToken", token);
			setIsLoggedIn(true);
			setUser({
				userId: decoded.userId,
				// Add other fields if needed
			});
		} catch (err) {
			console.error("Invalid token:", err);
			logout(); // Clear invalid token
		}
	};

	useEffect(() => {
		if (localStorage.getItem("authToken")) {
			setIsLoggedIn(true);
		}
	}, []);

	useEffect(() => {
		const savedToken = localStorage.getItem("authToken");
		if (savedToken) {
			setToken(savedToken);
			try {
				const decoded = jwtDecode(savedToken);
				setUser({
					userId: decoded.userId,
					// Add other fields if needed
				});
			} catch (err) {
				console.error("Failed to decode saved token", err);
			}
		}
	}, []);

	const logout = () => {
		localStorage.removeItem("authToken");
		setIsLoggedIn(false);
		setToken(null);
		setUser(null); // Redirect to login after logout
	};

	useEffect(() => {
		if (token) {
			localStorage.setItem("authToken", token);
		}
	}, [token]);

	return (
		<AuthContext.Provider value={{ isLoggedIn, token, user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

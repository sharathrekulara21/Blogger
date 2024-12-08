import React, { createContext, useState, useEffect } from "react";

// Create a context
const BlogContext = createContext();

const BlogProvider = ({ children }) => {
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(true);
	const appUrl = import.meta.env.VITE_API_URL

	useEffect(() => {
		// Fetch the blogs data when the component mounts
		fetch(`${appUrl}/api/blogs`)
			.then((response) => response.json())
			.then((data) => {
				setBlogs(data);
				setLoading(false); // Set loading to false once data is fetched
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
				setLoading(false); // Stop loading even if there's an error
			});
	}, []);

	return (
		<BlogContext.Provider value={{ blogs, loading }}>
			{children}
		</BlogContext.Provider>
	);
};

export { BlogProvider, BlogContext };

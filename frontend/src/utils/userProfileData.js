// useProfileData.js
import { useState, useEffect } from "react";
import { fetchUserData, fetchUserBlogs } from "./api";

const useProfileData = (userId, token) => {
	const [userDetails, setUserDetails] = useState(null);
	const [blogs, setBlogs] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		if (!userId || !token) {
			setError("Missing userId or token.");
			return;
		}
		const fetchData = async () => {
			try {
				const userResponse = await fetchUserData(userId, token);
				setUserDetails(userResponse.data);

				const blogResponse = await fetchUserBlogs(userId, token);
				const sortedPosts = blogResponse.data.sort(
					(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
				);
				setBlogs(sortedPosts);
				setError("");
			} catch (err) {
				if (err.status === 404) {
					setError("");
				} else {
					setError("Failed to load Data. Please try again later.");
				}
			}
		};
		fetchData();
	}, [userId, token]);

	return { userDetails, blogs, setError, error, setUserDetails, setBlogs };
};

export default useProfileData;

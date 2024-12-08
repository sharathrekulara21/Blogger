import axios from "axios";

const appUrl = import.meta.env.VITE_API_URL;

export const fetchUserData = (userId, token) => {
	return axios.get(`${appUrl}/api/users/${userId}`, {
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const fetchUserBlogs = (userId, token) => {
	return axios.get(`${appUrl}/api/users/${userId}/blogs`, {
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const updatedUserProfile = (userId, formData, token) => {
	return axios.put(`${appUrl}/api/users/${userId}`, formData, {
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const postComment = (userId, blogId, commentText, token) => {
	return axios.put(
		`${appUrl}/api/users/${userId}/blogs/${blogId}/comment`,
		{ commentText },
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
};

export const deleteBlog = (userId, blogId, token) => {
	return axios.delete(`${appUrl}/api/users/${userId}/blogs/${blogId}`, {
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const editBlogUrl = (userId, blogId, formData, token) => {
	return axios.put(`${appUrl}/api/users/${userId}/blogs/${blogId}`, formData, {
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const postBlog = (userId, formData, token) => {
	return axios.post(`${appUrl}/api/users/${userId}/blogs`, formData, {
		headers: { Authorization: `Bearer ${token}` },
	});
};

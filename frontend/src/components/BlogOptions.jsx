import React, { useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { deleteBlog } from "../utils/api";

const BlogOptions = ({
	blog,
	successMessage,
	setEditBlog,
	setEditingBlogId,
	setSuccessMessage,
	setErrorMessage,
	setBlogs,
}) => {
	const { token, user } = useAuth();
	const userId = user?.userId;
	const blogId = blog._id;

	// Handles delete functionality
	const handleDelete = async () => {
		try {
			const response = await deleteBlog(userId, blogId, token);
			if (response.status === 200) {
				setSuccessMessage(response.message || "Blog deleted successfully!");
				setBlogs((prev) => prev.filter((blg) => blg._id !== blogId));
			}
		} catch (err) {
			setErrorMessage(
				err.message || "Post can't be deleted. Please try again later!"
			);
		}
	};

	// Handles Edit functionality
	const handleEdit = async () => {
		setEditBlog(true);
		setEditingBlogId(blog._id);
	};

	useEffect(() => {
		if (successMessage) {
			const timer = setTimeout(() => {
				setSuccessMessage("");
			}, 2000);
			return () => clearTimeout(timer); // Cleanup the timeout
		}
	}, [successMessage, setSuccessMessage]);

	return (
		<div className='flex flex-row p-4'>
			<CiEdit
				onClick={handleEdit}
				className='cursor-pointer text-xl mx-3 text-gray-600 hover:text-2xl ease-in-out duration-300'
			/>
			<MdDelete
				onClick={handleDelete}
				className='cursor-pointer text-xl mx-3 text-red-400 hover:text-2xl ease-in-out duration-300'
			/>
		</div>
	);
};

export default BlogOptions;

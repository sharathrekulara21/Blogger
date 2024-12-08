import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { editBlogUrl, postBlog } from "../utils/api";

const AddBlog = ({
	editBlog,
	setEditBlog,
	errorMessage,
	successMessage,
	setErrorMessage,
	setEditingBlogId,
	setSuccessMessage,
	setNewPost,
	setBlogs,
	blog,
}) => {
	const [formData, setFormData] = useState(
		editBlog
			? {
					title: blog.title,
					content: blog.content,
					tags: blog.tags,
			  }
			: {
					title: "",
					content: "",
					tags: "",
			  }
	);
	const { user, token } = useAuth();
	const userId = user?.userId;
	const blogId = blog?._id;
	const [blogSuccessMessage, setBlogSuccessMessage] = useState("");
	const [error, setError] = useState("");

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleDiscard = () => {
		setFormData(
			editBlog
				? {
						title: blog?.title,
						content: blog?.content,
						tags: blog?.tags,
				  }
				: {
						title: "",
						content: "",
						tags: "",
				  }
		);

		editBlog ? setEditingBlogId("") : setNewPost(false);
		setEditBlog();
	};

	const handleSave = async () => {
		try {
			const response = editBlog
				? await editBlogUrl(userId, blogId, formData, token)
				: await postBlog(userId, formData, token);
			if (response.status === 201 || response.status === 200) {
				editBlog
					? setBlogs((prevBlogs) =>
							prevBlogs.map((blog) =>
								blog._id === response.data._id
									? { ...blog, ...response.data }
									: blog
							)
					  )
					: setBlogs((prev) => [response.data.blog, ...prev]);
				editBlog
					? setSuccessMessage(response.message || "Post Updated Successfully!")
					: setBlogSuccessMessage(
							response.message || "Post Added Successfully!"
					  );
				setError("");
				setErrorMessage("");
			}
		} catch (err) {
			editBlog
				? setErrorMessage(err.message || "Internal Server error while posting")
				: setError(err.message || "Internal Server error while posting");
			setBlogSuccessMessage("");
			setSuccessMessage("");
		}
	};

	useEffect(() => {
		if (successMessage) {
			const timer = setTimeout(() => {
				setEditBlog((prev) => {
					if (prev === true) {
						return false; // Reset only if currently editing
					}
					return prev;
				});
				setSuccessMessage("");
			}, 2000);
			return () => clearTimeout(timer); // Cleanup the timeout
		}
	}, [successMessage, setSuccessMessage, setEditBlog]);

	useEffect(() => {
		if (errorMessage) {
			const timer = setTimeout(() => {
				setErrorMessage("");
				setEditBlog(false);
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [errorMessage, setErrorMessage, setEditBlog]);

	useEffect(() => {
		if (blogSuccessMessage) {
			const timer = setTimeout(() => {
				setBlogSuccessMessage("");
				setNewPost();
			}, 2000);
			return () => clearTimeout(timer); // Cleanup the timeout
		}
	}, [blogSuccessMessage, setNewPost]);
	console.log(editBlog);

	return (
		<div>
			<h4>{editBlog ? "Update the Blog" : "New Blog"}</h4>
			{blogSuccessMessage && (
				<p className='text-white border bg-green-400 p-2 mb-2 text-sm'>
					{blogSuccessMessage}
				</p>
			)}
			{error && (
				<p className='text-white border border-gray-300 p-2 bg-red-400 mb-2'>
					{error}
				</p>
			)}
			<div className='flex flex-col gap-3 p-2'>
				<div className='flex flex-row items-center'>
					<label className='min-w-[75px]' htmlFor='title'>
						Title
					</label>
					<input
						name='title'
						value={formData.title}
						type='text'
						className='focus:outline-none border-gray-400 border p-2 text-sm block w-full'
						onChange={handleInputChange}
						placeholder='Title of your blog'
					/>
				</div>
				<div className='flex flex-row'>
					<label htmlFor='content' className='min-w-[75px]'>
						Content
					</label>
					<textarea
						name='content'
						value={formData.content}
						className='focus:outline-none border-gray-400 border p-2 text-sm block w-full resize-y'
						onChange={handleInputChange}
						type='text'
						placeholder='Type your blog content here'
					/>
				</div>
				<div className='flex flex-row'>
					<label htmlFor='tags' className='min-w-[75px]'>
						Tags
					</label>
					<input
						value={formData.tags}
						onChange={handleInputChange}
						className='focus:outline-none border-gray-400 border p-2 text-sm block w-full '
						name='tags'
						type='text'
						placeholder='Any tags for this blogs?'
					/>
				</div>
				<div className='flex flex-row justify-center'>
					<button
						className='bg-red-500 p-2 border-none rounded m-2 text-gray-800 transition duration-300 ease-in-out'
						onClick={handleDiscard}
					>
						Discard
					</button>
					<button
						type='submit'
						className='bg-green-500 rounded px-4 border-none m-2 text-gray-800'
						onClick={handleSave}
					>
						{editBlog ? "Update" : "Post"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddBlog;

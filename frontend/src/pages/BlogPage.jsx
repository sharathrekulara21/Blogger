import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import CommentCard from "../components/CommentCard";
import { BlogContext } from "../context/BlogContext";

const BlogPage = () => {
	const { id } = useParams();
	const { blogs, loading } = useContext(BlogContext);

	const blog = blogs.find((blog) => blog._id === id);

	if (!blog) return <div className='text-center'>Blog not Found</div>;
	return (
		<div className='p-6 m-4 flex flex-col justify-center max-w-screen-md'>
			<h1 className='font-bold text-3xl mb-2'>{blog.title}</h1>
			<p className='text-grey-800 text-justify mb-2'>{blog.content}</p>
			<CommentCard blog={blog} />
		</div>
	);
};

export default BlogPage;

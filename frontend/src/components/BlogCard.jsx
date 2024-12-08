import React from "react";
import {useNavigate } from "react-router-dom";
import formatDate from "../assets/UtilityFunc";

const BlogCard = ({ blog }) => {
	const navigate = useNavigate();

	return (
		<div
			onClick={() => navigate(`/blogs/${blog._id}`)}
			className='cursor-pointer flex flex-col p-6 border border-gray-500 shadow-sm hover:shadow-xl transition-shadow'
		>
			<h2 className='mb-2 text-3xl font-bold text-gray-900'>{blog.title}</h2>
			<p className='text-gray-400 text-sm font-bold'>
				{blog.author?.firstName} {blog.author?.lastName} .{" "}
				{formatDate(new Date(blog.createdAt))}
			</p>
			<p className='font-normal text-grey-800'>
				{blog.content.length > 100 ? (
					<>
						{blog.content.substring(0, 100)}
						<a className='text-sm text-gray-500'>...Read more</a>
					</>
				) : (
					blog.content
				)}
			</p>
		</div>
	);
};

export default BlogCard;

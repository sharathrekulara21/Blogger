import React, { useContext } from "react";
import BlogCard from "../components/BlogCard";
import { BlogContext } from "../context/BlogContext";

const HomePage = () => {
	const { blogs, loading } = useContext(BlogContext);

	if (loading) {
		return <div>Loading..</div>;
	}

	return (
		<div className='container mx-auto p-4'>
			{blogs.length > 0 && (
				<div className='md:mb-4 lg:md-4'>
					<BlogCard blog={blogs[0]} />
				</div>
			)}

			<div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-1 gap-1'>
				{blogs.slice(1).map((blog) => (
					<BlogCard key={blog._id} blog={blog} />
				))}
			</div>
		</div>
	);
};

export default HomePage;

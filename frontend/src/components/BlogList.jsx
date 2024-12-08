import React from "react";
import BlogCard from "./BlogCard";
import BlogOptions from "./BlogOptions";
import AddBlog from "./AddBlog";

const BlogList = ({profileState,blogs,setBlogs,setProfileState}) => {
	return (
		<div>
			<div className='flex flex-col m-0 p-0 gap-0'>
				<p
					className={
						profileState.successMessage
							? "text-white border border-gray-300 bg-green-400 p-2 mb-2 text-sm"
							: profileState.errorMessage &&
							  "text-white border border-gray-300 p-2 bg-red-400 mb-2 text-sm"
					}
				>
					{profileState.successMessage
						? profileState.successMessage
						: profileState.errorMessage
						? profileState.errorMessage
						: ""}
				</p>
				{blogs.length > 0
					? blogs.map((blog) => (
							<div
								key={blog._id}
								className='m-1 p-0 relative ease-in-out duration-200'
							>
								{profileState.editBlog &&
								profileState.editingBlogId === blog._id ? (
									<div>
										<AddBlog
											successMessage={profileState.successMessage}
											setSuccessMessage={(value) =>
												setProfileState((prev) => ({
													...prev,
													successMessage: value,
												}))
											}
											setErrorMessage={(value) =>
												setProfileState((prev) => ({
													...prev,
													errorMessage: value,
												}))
											}
											errorMessage={profileState.errorMessage}
											setBlogs={setBlogs}
											editBlog={profileState.editBlog}
											setEditingBlogId={(value) =>
												setProfileState((prev) => ({
													...prev,
													editingBlogId: value,
												}))
											}
											setEditBlog={() =>
												setProfileState((prev) => ({
													...prev,
													editBlog: !prev.editBlog,
												}))
											}
											blog={blog}
										/>
									</div>
								) : (
									<div>
										<div className='absolute right-0'>
											<BlogOptions
												setBlogs={setBlogs}
												successMessage={profileState.successMessage}
												errorMessage={profileState.errorMessage}
												editBlog={profileState.editBlog}
												setEditingBlogId={(value) =>
													setProfileState((prev) => ({
														...prev,
														editingBlogId: value,
													}))
												}
												setEditBlog={(value) =>
													setProfileState((prev) => ({
														...prev,
														editBlog: value,
													}))
												}
												setSuccessMessage={(value) =>
													setProfileState((prev) => ({
														...prev,
														successMessage: value,
													}))
												}
												setErrorMessage={(value) =>
													setProfileState((prev) => ({
														...prev,
														errorMessage: value,
													}))
												}
												blog={blog}
											/>
										</div>
										<BlogCard key={blog._id} blog={blog} />
									</div>
								)}
							</div>
					  ))
					: "No blogs to show"}
			</div>
		</div>
	);
};

export default BlogList;

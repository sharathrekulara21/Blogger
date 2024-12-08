const Blog = require("../models/Blog");

exports.getAllBlogs = async (req, res) => {
	try {
		const Allblogs = await Blog.find()
			.populate("author", "firstName lastName")
			.populate("comments.user", "firstName lastName");
		return res
			.status(200)
			.json(
				Allblogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
			);
	} catch (err) {
		return res.status(500).json(err);
	}
};

exports.getBlogById = async (req, res) => {
	try {
		const blog = await Blog.findById(req.params.id);
		return res.status(200).json(blog);
	} catch (err) {
		return res.status(500).json(err);
	}
};

exports.getUserBlogs = async (req, res) => {
	try {
		const userId = req.params.id;
		const blogs = await Blog.find({ author: userId }).populate(
			"author",
			"firstName lastName"
		);
		if (blogs.length > 0) {
			return res.status(200).json(blogs);
		} else {
			return res.status(404).json({ message: "No blogs found for this user." }); // No blogs
		}
	} catch (err) {
		return res.status(500).json({ message: "Internal server error" });
	}
};

exports.createNewBlog = async (req, res) => {
	const userId = req.params.id;
	const { title, content, tags } = req.body;

	try {
		const newBlog = new Blog({
			title,
			content,
			author: userId,
			tags,
		});
		await newBlog.save();
		const blogWithAuthor = await Blog.findById(newBlog._id).populate(
			"author",
			"firstName lastName"
		);

		return res
			.status(201)
			.json({ message: "Blog created successfully", blog: blogWithAuthor });
	} catch (err) {
		return res.status(500).json(err.message);
	}
};

exports.updateBlog = async (req, res) => {
	const { userId, blogId } = req.params;
	const updatedData = req.body;

	try {
		const updatedBlog = await Blog.findByIdAndUpdate(
			{ _id: blogId, author: userId },
			updatedData,
			{
				new: true,
			}
		).populate("author", "firstName lastName");

		if (!updatedBlog) {
			return res.status(404).json({
				message: "Blog not found or you are not authorized to edit this blog",
			});
		}
		return res.status(201).json(updatedBlog);
	} catch (err) {
		return res
			.status(500)
			.json({ message: "Internal Server Error", error: err.message });
	}
};

exports.deleteBlog = async (req, res) => {
	const { userId, blogId } = req.params;

	try {
		const blogToDelete = await Blog.findOne({
			_id: blogId,
			author: userId,
		});

		if (!blogToDelete) {
			return res.status(404).json({
				message: "Blog not found or you are not authorized to edit this blog",
			});
		}

		await Blog.findByIdAndDelete(blogId);
		return res.status(200).json({ message: "Blog deleted Successfully" });
	} catch (err) {
		return res
			.status(500)
			.json({ message: "Internal Server Error", error: err.message });
	}
};

exports.addComments = async (req, res) => {
	try {
		const { userId, blogId } = req.params; // Get the blog ID from the route parameter
		const { commentText } = req.body;
		if (!commentText || commentText.length == 0) {
			return res.status(400).json({ message: "Enter a valid comment" });
		}
		const comment = {
			user: userId,
			comment: commentText,
			timestamp: new Date(),
		};
		const updatedBlog = await Blog.findByIdAndUpdate(
			blogId,
			{ $push: { comments: comment } },
			{ new: true }
		).populate("author", "firstName lastName");

		if (!updatedBlog) {
			return res.status(404).json({ message: "Blog not found" });
		}

		const populatedBlog = await Blog.findById(updatedBlog._id)
			.populate("comments.user", "firstName lastName") // Populate the 'user' field in the comments
			.exec();

		if (populatedBlog && populatedBlog.comments) {
			populatedBlog.comments = populatedBlog.comments.sort(
				(a, b) => new Date(b.timestamp) - new Date(a.timestamp)
			);
		}

		return res
			.status(201)
			.json({ message: "Comment added successfully", blog: populatedBlog });
	} catch (err) {
		return res.status(500).json({ message: "Error while adding the comment" });
	}
};

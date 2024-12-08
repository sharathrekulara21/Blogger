const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware.js");
const {
	getAllBlogs,
	getBlogById,
	getUserBlogs,
	createNewBlog,
	updateBlog,
	deleteBlog,
	addComments,
} = require("../controllers/blogController.js");

// GET /blogs - Fetch all blogs without any auth
router.get("/blogs", getAllBlogs);

// GET /blogs/:id - Fetch a specific blog
router.get("/blogs/:id", getBlogById);

// GET /users/:id/blogs - Finding user blogs with auth
router.get("/users/:id/blogs", verifyToken, getUserBlogs);

// POST /blogs - Create a new blog post with auth
router.post("/users/:id/blogs", verifyToken, createNewBlog);

// PUT /blogs/:id - Update a blog post.
router.put("/users/:userId/blogs/:blogId", verifyToken, updateBlog);

// DELETE /blogs/:id - Delete a blog post
router.delete("/users/:userId/blogs/:blogId", verifyToken, deleteBlog);

// POST /blogs/:id/comments - Adds a comment to a post
router.put("/users/:userId/blogs/:blogId/comment", verifyToken, addComments);

module.exports = router;

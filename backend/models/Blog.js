const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	tags: {
		type: [String], // Array of strings for tags
	},
	createdAt: {
		type: Date,
		default: Date.now, // Defaults to the current date if not provided
	},
	comments: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: "User", // Ensures user is provided in each comment
			},
			comment: {
				type: String,
				required: true, // Ensures comment text is provided
			},
			timestamp: {
				type: Date,
				default: Date.now, // Defaults to the current date if not provided
			},
		},
	],
});

BlogSchema.pre("save", function (next) {
	if (this.comments && Array.isArray(this.comments)) {
		this.comments.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
	}
	next();
});

module.exports = mongoose.model("Blog", BlogSchema);

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "Please enter your name"],
	},
	lastName: {
		type: String,
		required: [true, "Please enter your name"],
	},
	email: {
		type: String,
		required: [true, "Please Enter Your Email"],
		unique: true,
		validate: [validator.isEmail, "Please Enter a valid Email"],
	},
	password: {
		type: String,
		required: [true, "Please Enter Your Password"],
		minLength: [8, "Password should be greater than 8 characters"],
		select: false,
	},
	about: {
		type: String,
		default: "",
	},
	socialMedia: {
		facebook: {
			type: String,
			default: "https",
		},
		twitter: {
			type: String,
			default: "",
		},
		linkedin: {
			type: String,
			default: "",
		},
		instagram: {
			type: String,
			default: "",
		},
		youtube: {
			type: String,
			default: "",
		},
	},
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Blog",
		},
	],
	// avatar: {
	// 	public_id: {
	// 		type: String,
	// 		required: true,
	// 	},
	// 	url: {
	// 		type: String,
	// 		required: true,
	// 	},
	// },
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

// Hashing password before saving
userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 10);
	}
	next();
});

// Comparing password

userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);

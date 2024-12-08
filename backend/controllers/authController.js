const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	try {
		if (!firstName && !lastName) {
			// Login logi
			if (!email || !password) {
				return res
					.status(400)
					.json({ error: "Email and password are required for login." });
			}

			const user = await User.findOne({ email }).select("+password");
			if (!user) {
				return res.status(404).json({ message: "Invalid Credentials" });
			}

			const isPasswordValid = await bcrypt.compare(password, user.password);
			if (!isPasswordValid) {
				return res.status(401).json({ message: "Invalid Credentials" });
			}

			const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
				expiresIn: "3h",
			});
			return res.status(200).json({ message: "Login successful!", token });
		} else {
			if (!firstName || !lastName || !email || !password) {
				return res.status(400).json({
					error:
						"First name, last name, email and password are required for registration.",
				});
			}

			const existingUser = await User.findOne({ email });
			if (existingUser) {
				return res.status(409).json({ error: "Email is already in use." });
			}

			const newUser = new User({
				firstName,
				lastName,
				email,
				password,
			});

			await newUser.save();
			return res.status(201).json({ message: "User registration successful" });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ err: err.message });
	}
};
const User = require("../models/user");

exports.findUser = async (req, res) => {
	try {
		const currUser = await User.findById(req.params.id);
		if (currUser) {
			return res.status(200).json(currUser);
		}
	} catch (err) {
		return res.status(500).json(err);
	}
};

exports.updateProfile = async (req, res) => {
	const userId = req.params.id;
	const { firstName, lastName, email, about, socialMedia } = req.body;

	try {
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ firstName, lastName, email, about, socialMedia },
			{ new: true, runValidators: true }
		);
		return res
			.status(200)
			.json({ message: "Profile updated successfully", user: updatedUser });
	} catch (err) {
		return res
			.status(500)
			.json({ message: "Failed to update the user", error: err.message });
	}
};
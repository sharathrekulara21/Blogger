const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	const token = req.header("Authorization")?.split(" ")[1];
	if (!token) {
		return res.status(403).json({ message: "Token is required" });
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({ message: "Invalid or expired token" });
		}

		req.user = decoded;
		next();
	});
};

module.exports = verifyToken;

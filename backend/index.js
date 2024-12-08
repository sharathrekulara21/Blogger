const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes.js");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", blogRoutes);
app.use("/api/users", userRoutes);
app.use("/api", authRoutes);

const PORT = process.env.PORT || 4000;

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("MongoDB is connected"))
	.catch((err) => console.error(err));

app.listen(PORT);

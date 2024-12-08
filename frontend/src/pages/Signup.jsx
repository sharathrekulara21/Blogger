import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
	const [newUser, setNewUser] = useState(true);
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const navigate = useNavigate();
	const { login } = useAuth();
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		repeatPassword: "",
	});

	const handleChange = (e) => {
		const { id, value } = e.target;
		setFormData({ ...formData, [id]: value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		if (newUser && formData.password !== formData.repeatPassword) {
			setError("Passwords do not match!");
			return;
		}

		if (formData.password.length < 8) {
			setError("Password should be at least 8 characters.");
			return;
		}

		try {
			const url = "http://localhost:5000/api/signup";

			const data = newUser
				? {
						firstName: formData.firstName,
						lastName: formData.lastName,
						email: formData.email,
						password: formData.password,
				  }
				: {
						email: formData.email,
						password: formData.password,
				  };
			const response = await axios.post(url, data);
			if (response.status === 200) {
				login(response.data.token);
				setSuccessMessage(response.data.message || "Success!");
			} else {
				setError(response.data.message);
			}
		} catch (err) {
			setError(err.response.data.message);
		}
	};

	// Navigate to home page 2 seconds after login
	useEffect(() => {
		if (successMessage) {
			const timer = setTimeout(() => {
				navigate("/");
			}, 2000);
			return () => clearTimeout(timer); // Cleanup the timeout
		}
	}, [successMessage, navigate]);

	return (
		<div className='p-10 flex flex-col justify-center items-center'>
			<h2 className='font-bold text-2xl underline mb-4'>
				{newUser ? "Sign up" : "Log in"}
			</h2>
			<form className='max-w-md w-full mx-auto' onSubmit={handleSubmit}>
				{error && (
					<p className='text-white border border-gray-300 p-2 bg-red-400 mb-2'>
						{error}
					</p>
				)}
				{successMessage && (
					<p className='text-white border bg-green-400 p-2 mb-2 text-sm'>
						{successMessage}
					</p>
				)}
				{newUser && (
					<div className='flex flex-col md:space-x-4 lg:space-x-4 md:flex-row lg:flex-row'>
						<div className='md:flex-1 lg:flex-1 mb-5'>
							<label
								htmlFor='Firstname'
								className='block mb-2 text-sm font-medium text-gray-900'
							>
								First Name
							</label>
							<input
								type='text'
								id='firstName'
								className='shadow-sm bg-gray-50 border focus:outline-none border-gray-200 text-gray-900 text-sm hover:border-gray-400 focus:border-gray-400 block w-full p-2.5 '
								placeholder='First name'
								onChange={handleChange}
								value={formData.firstName}
								required
							/>
						</div>
						<div className='md:flex-1 lg:flex-1 mb-5'>
							<label
								htmlFor='lastname'
								className='block mb-2 text-sm font-medium text-gray-900'
							>
								Last Name
							</label>
							<input
								type='text'
								id='lastName'
								className='shadow-sm bg-gray-50 border focus:outline-none border-gray-200 text-gray-900 text-sm hover:border-gray-400 focus:border-gray-400 block w-full p-2.5 '
								placeholder='Last name'
								onChange={handleChange}
								value={formData.lastName}
								required
							/>
						</div>
					</div>
				)}

				<div className='mb-5'>
					<label
						htmlFor='email'
						className='block mb-2 text-sm font-medium text-gray-900'
					>
						Your email
					</label>
					<input
						type='email'
						id='email'
						className='shadow-sm bg-gray-50 border focus:outline-none border-gray-200 text-gray-900 text-sm hover:border-gray-400 focus:border-gray-400 block w-full p-2.5 '
						placeholder='name@gmail.com'
						onChange={handleChange}
						value={formData.email}
						required
					/>
				</div>

				<div className='mb-5'>
					<label
						htmlFor='password'
						className='block mb-2 text-sm font-medium text-gray-900'
					>
						Your password
					</label>
					<input
						type='password'
						id='password'
						placeholder='Enter your password'
						onChange={handleChange}
						value={formData.password}
						className='shadow-sm bg-gray-50 border focus:outline-none hover:border-gray-400 border-gray-200 focus:border-gray-400 text-gray-900 text-sm  block w-full p-2.5 '
						required
					/>
				</div>
				{newUser && (
					<div className='mb-5'>
						<label
							htmlFor='repeat-password'
							className='block mb-2 text-sm font-medium text-gray-900 '
						>
							Repeat password
						</label>
						<input
							type='password'
							id='repeatPassword'
							placeholder='Re-Enter your password'
							onChange={handleChange}
							value={formData.repeatPassword}
							className='shadow-sm bg-gray-50 border focus:outline-none hover:border-gray-400 focus:border-gray-400 border-gray-200 text-gray-900 text-sm  block w-full p-2.5 '
							required
						/>
					</div>
				)}

				<div className='flex items-center gap-3'>
					<button
						type='submit'
						className='text-gray-900 transition-shadow hover:border-gray-400 focus:border-gray-400 focus:outline-none border border-gray-200 font-medium text-sm px-5 py-2.5 text-center'
					>
						{newUser ? "Sign up" : "Log in"}
					</button>
					<a
						className='cursor-pointer text-sm text-gray-500 hover:underline'
						onClick={() => setNewUser(!newUser)}
					>
						{newUser
							? "Already have an account?"
							: "Don't have an account? Sign up"}
					</a>
				</div>
			</form>
		</div>
	);
};

export default Signup;

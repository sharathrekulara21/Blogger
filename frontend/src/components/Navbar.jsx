import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [profileMenuOpen, setProfileMenuOpen] = useState(false);
	const { isLoggedIn, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	useEffect(() => {
		setProfileMenuOpen(false);
	}, [isLoggedIn]);

	return (
		<div className='sticky top-0 z-50 flex flex-row justify-between items-center p-3 bg-white shadow-md'>
			{/* Logo */}
			<div>
				<Link to='/'>
					<img
						src='/logo.png'
						alt='logo'
						className='h-8 w-auto sm:h-10 md:h-12'
					/>
				</Link>
			</div>

			{/* Desktop Navigation */}
			<nav className='hidden md:flex gap-5 pr-4'>
				{isLoggedIn ? (
					<div className='flex flex-row gap-5 items-center'>
						<Link to='/'>Home</Link>
						<div
							className='relative'
							onClick={() => setProfileMenuOpen((prev) => !prev)}
						>
							<FaUserCircle className='cursor-pointer w-6 h-6' />
							{/* Profile Dropdown */}
							{profileMenuOpen && (
								<div className='flex flex-col w-28 items-center absolute right-0 mt-2 bg-white shadow-md rounded p-3'>
									<Link to='/profile'>Profile</Link>
									<button className='mt-2 text-red-500' onClick={handleLogout}>
										Log out
									</button>
								</div>
							)}
						</div>
					</div>
				) : (
					<>
						<Link to='/'>Home</Link>
						<Link to='/signup'>Log In</Link>
					</>
				)}
			</nav>

			{/* Mobile Menu Toggle */}
			<div
				className='md:hidden z-50 cursor-pointer'
				onClick={() => setMobileMenuOpen((prev) => !prev)}
			>
				{mobileMenuOpen ? (
					<IoClose className='w-6 h-8' />
				) : (
					<RxHamburgerMenu className='w-6 h-8' />
				)}
			</div>

			{/* Mobile Navigation */}
			{mobileMenuOpen && (
				<nav className='fixed top-[55px] left-0 w-full bg-white z-40 flex flex-col md:hidden items-center gap-5 p-5 shadow-md'>
					{isLoggedIn ? (
						<>
							<Link to='/' onClick={() => setMobileMenuOpen(false)}>
								Home
							</Link>
							<Link to='/profile' onClick={() => setMobileMenuOpen(false)}>
								Profile
							</Link>
							<button
								onClick={() => {
									handleLogout();
									setMobileMenuOpen(false);
								}}
							>
								Log out
							</button>
						</>
					) : (
						<>
							<Link to='/' onClick={() => setMobileMenuOpen(false)}>
								Home
							</Link>
							<Link to='/signup' onClick={() => setMobileMenuOpen(false)}>
								Log In
							</Link>
						</>
					)}
				</nav>
			)}
		</div>
	);
};

export default Navbar;

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import AddBlog from "../components/AddBlog";
import { updatedUserProfile } from "../utils/api";
import useProfileData from "../utils/userProfileData";
import UserProfile from "../components/UserProfile";
import UserAbout from "../components/UserAbout";
import BlogHeader from "../components/BlogHeader";
import BlogList from "../components/BlogList";
import SocialMedia from "../components/SocialMedia";

const Profile = () => {
	// User Variables
	const { user, token } = useAuth();
	const userId = user?.userId;
	const { userDetails, blogs, error, setError, setUserDetails, setBlogs } =
		useProfileData(userId, token);
	const [profileState, setProfileState] = useState({
		editable: false,
		newPost: false,
		editBlog: false,
		editingBlogId: "",
		successMessage: "",
		errorMessage: "",
	});

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		about: "",
		socialMedia: {},
	});

	// Handle Input changes while editing
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Updates the form with change in userDetals
	useEffect(() => {
		if (userDetails) {
			setFormData((prev) => ({
				...prev,
				firstName: userDetails.firstName,
				lastName: userDetails.lastName,
				about: userDetails.about,
				socialMedia: userDetails.socialMedia || {},
			}));
		}
	}, [userDetails]);

	// Displays Loading bar
	if (!userId || !token) {
		return <div>Loading..</div>;
	}

	// Handles social Media Changes
	const handleSocialMediaChange = (e, platform) => {
		setFormData((prev) => ({
			...prev,
			socialMedia: {
				...prev.socialMedia,
				[platform]: e.target.value,
			},
		}));
	};

	// Handles the updating with dB when we edited the details
	const handleSave = async () => {
		console.log("Token input:", token);
		console.log(formData);
		try {
			const response = await updatedUserProfile(userId, formData, token);
			if (response.status === 200) {
				setUserDetails(response.data.user);
				setProfileState((prev) => ({ ...prev, editable: false }));
			}
			// eslint-disable-next-line no-unused-vars
		} catch (err) {
			setError("Internal Server error while updating profile");
		}
	};

	return (
		<div className='flex flex-col mt-4 p-8 gap-2'>
			{error && <div className='text-red-500'>{error}</div>}
			{/* Displays the Name  */}
			<UserProfile
				profileState={profileState}
				userDetails={userDetails}
				formData={formData}
				handleInputChange={handleInputChange}
			/>
			{/* Displays about section */}
			<UserAbout
				profileState={profileState}
				userDetails={userDetails}
				formData={formData}
				handleInputChange={handleInputChange}
			/>

			{/*  Displays blogs */}
			<div>
				<BlogHeader
					toggleNewPost={() =>
						setProfileState((prev) => ({
							...prev,
							newPost: !prev.newPost,
						}))
					}
				/>

				<div className='max-w-4xl'>
					<div className='transition-all duration-500 ease-in-out'>
						{profileState.newPost && (
							<AddBlog
								setBlogs={setBlogs}
								setErrorMessage={(value) =>
									setProfileState((prev) => ({
										...prev,
										errorMessage: value,
									}))
								}
								setNewPost={(value) =>
									setProfileState((prev) => ({
										...prev,
										newPost: value,
									}))
								}
							/>
						)}
					</div>
					<BlogList
						setBlogs={setBlogs}
						blogs={blogs}
						setProfileState={setProfileState}
						profileState={profileState}
					/>
				</div>
			</div>
			{/* Social media */}
			<SocialMedia
				userDetails={userDetails}
				formData={formData}
				profileState={profileState}
				handleSocialMediaChange={handleSocialMediaChange}
			/>
			{/* Edit button */}
			<div className='flex justify-end mt-4'>
				{profileState.editable ? (
					<button
						className='bg-green-500 text-white py-2 px-4 rounded'
						onClick={handleSave}
					>
						Save
					</button>
				) : (
					<button
						className='bg-blue-500 text-white py-2 px-4 rounded'
						onClick={() =>
							setProfileState((prev) => ({
								...prev,
								editable: (prev) => !prev,
							}))
						}
					>
						Edit Profile
					</button>
				)}
			</div>
		</div>
	);
};

export default Profile;

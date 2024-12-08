import React from "react";
import { FaUserCircle } from "react-icons/fa";

const UserProfile = ({
	profileState,
	formData,
	handleInputChange,
	userDetails,
}) => {
	return (
			<div className=' flex flex-col items-center'>
				<FaUserCircle className='w-28 h-28 mb-2 text-gray-400' />
				<h2 className='font-bold text-gray-700'>
					{profileState.editable ? (
						<div className='flex flex-col md:flex-row'>
							<input
								type='text'
								name='firstName'
								placeholder = 'First Name'
								value={formData.firstName || ""}
								onChange={handleInputChange}
								className='border-b-2'
							/>
							<input
								type='text'
								placeholder = 'Last Name'
								name='lastName'
								value={formData.lastName}
								onChange={handleInputChange}
								className='border-b-2'
							/>
						</div>
					) : userDetails?.firstName && userDetails?.lastName ? (
						`${userDetails.firstName.toUpperCase()} ${userDetails.lastName.toUpperCase()}`
					) : (
						"Loading..."
					)}
				</h2>
			</div>
	);
};

export default UserProfile;

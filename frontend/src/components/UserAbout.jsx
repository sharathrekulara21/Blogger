import React from 'react'

const UserAbout = ({profileState,formData,handleInputChange,userDetails}) => {
  return (
		<div>
			<h4 className='font-bold text-gray-700'>ABOUT</h4>
			{profileState.editable ? (
				<textarea
					name='about'
					value={formData.about}
					onChange={handleInputChange}
					className='border w-full h-[5rem] p-3 text-sm'
				/>
			) : userDetails ? (
				<p className='border w-full h-[5rem] p-3 text-sm'>
					{userDetails.about?.length > 0
						? userDetails.about
						: "Let others know about you"}
				</p>
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
}

export default UserAbout
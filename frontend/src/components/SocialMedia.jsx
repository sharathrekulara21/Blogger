import React from 'react'

const SocialMedia = ({profileState,userDetails,formData,handleSocialMediaChange}) => {
  return (
		<div>
			<h4 className='font-bold text-gray-700 mb-1'>SOCIAL MEDIA</h4>
			{userDetails?.socialMedia &&
				Object.entries(userDetails.socialMedia).map(([platform, value]) => (
					<div key={platform} className='flex flex-row gap-3 mb-2 items-center'>
						<h5 className='text-sm min-w-[100px]'>{platform.toUpperCase()}</h5>
						{profileState.editable ? (
							<input
								type='text'
								name={platform}
								id={platform}
								className='bg-gray-200 p-2 w-full max-w-lg'
								value={formData.socialMedia[platform] || value}
								onChange={(e) => handleSocialMediaChange(e, platform)}
							/>
						) : (
							<input
								type='text'
								name={platform}
								id={platform}
								className='bg-gray-200 p-2 w-full max-w-lg'
								value={value}
								readOnly
							/>
						)}
					</div>
				))}
		</div>
	);
}

export default SocialMedia
import { MdAddBox } from "react-icons/md";

const BlogHeader = ({ toggleNewPost }) => {
	return (
		<div className='flex flex-row justify-between items-center'>
			<h4 className='font-bold text-gray-700'>BLOGS</h4>
			<MdAddBox
				className='text-xl cursor-pointer text-gray-500'
				onClick={toggleNewPost}
			/>
		</div>
	);
};

export default BlogHeader;

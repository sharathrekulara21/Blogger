import React, { useState } from "react";
import formatDate from "../assets/UtilityFunc";
import AddComment from "./AddComment";
import { MdAddBox } from "react-icons/md";

export const CommentCard = ({ blog }) => {
	const c = blog?.comments;
	const sortedC = c.sort(
		(a, b) => new Date(b.timestamp) - new Date(a.timestamp)
	);
	const [comments, setComments] = useState(sortedC || []);

	const [addComment, setAddComment] = useState(false);
	const [commentMessage, setCommentMessage] = useState({
		successMessage: "",
		errorMessage: "",
	});

	return (
		<>
			<div className='flex flex-row justify-between items-center'>
				<h3 className='font-bold text-gray-700'>COMMENTS</h3>
				<MdAddBox
					className='text-xl cursor-pointer text-gray-500'
					onClick={() => setAddComment((prev) => !prev)}
				/>
			</div>
			{commentMessage.successMessage && (
				<div className='text-green-600 text-sm mt-2'>
					{commentMessage.successMessage}
				</div>
			)}
			{commentMessage.errorMessage && (
				<div className='text-red-600 text-sm mt-2'>
					{commentMessage.errorMessage}
				</div>
			)}
			<div className='transition-all duration-500 ease-in-out'>
				{addComment && (
					<AddComment
						setComments={setComments}
						setAddComment={setAddComment}
						setCommentMessage={setCommentMessage}
						blogId={blog._id}
					/>
				)}
			</div>
			<div className='shadow-sm border p-4'>
				<div className='flex flex-col gap-2'>
					{comments && comments.length > 0
						? comments.map((comment, index) => (
								<div key={index}>
									<h3>
										{comment?.user?.firstName} {comment?.user?.lastName} .{" "}
										<span className='text-gray-300 text-sm'>
											{formatDate(new Date(comment.timestamp))}
										</span>
									</h3>
									<p className='text-gray-700'>{comment.comment}</p>
								</div>
						  ))
						: "Be the first to comment"}
				</div>
			</div>
		</>
	);
};

export default CommentCard;

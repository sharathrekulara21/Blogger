import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { postComment } from "../utils/api";

const AddComment = ({
	blogId,
	setComments,
	setAddComment,
	setCommentMessage,
}) => {
	const [commentText, setCommentText] = useState("");
	const { user, token } = useAuth();
	const userId = user?.userId;

	const handleComment = async () => {
		try {
			const commentResp = await postComment(userId, blogId, commentText, token);
			if (commentResp.status === 201) {
				setCommentMessage((prev) => ({
					...prev,
					successMessage:
						commentResp.data.message || "Comment posted successfully!",
					errorMessage: "",
				}));
				const latestComment = commentResp?.data.blog.comments.slice(-1)[0];
				const newComment = {
					user: {
						firstName: latestComment?.user?.firstName || "Anonymous",
						lastName: latestComment?.user?.lastName || "",
					},
					comment: commentText,
					timestamp: new Date(),
				};
				setComments((prevComments) => [newComment, ...prevComments]);
			} else {
				setCommentMessage((prev) => ({
					...prev,
					successMessage: "",
					errorMessage: commentResp.data.error || "Please try again later!",
				}));
			}
			setTimeout(() => {
				setCommentMessage((prev) => ({
					...prev,
					successMessage: "",
					errorMessage: "",
				}));
			}, 2000);
		} catch (error) {
			setCommentMessage((prev) => ({
				...prev,
				errorMessage: "An error occurred. Please try again later!",
				successMessage: "",
			}));
			setTimeout(() => {
				setCommentMessage((prev) => ({
					...prev,
					errorMessage: "",
					successMessage: "",
				}));
			}, 2000);
		}
		setAddComment(false);
	};

	const handleDiscard = () => {
		setCommentText("");
		setAddComment(false);
	};

	return (
		<div className='flex flex-col gap-2 p-2'>
			<label htmlFor='comment'>Add a comment</label>
			<input
				type='text'
				name='comment'
				id='comment'
				className='focus:outline-none'
				value={commentText}
				onChange={(e) => setCommentText(e.target.value)}
				placeholder='Type your view..'
			/>
			<div className='flex flex-row justify-center'>
				<button
					className='bg-red-500 p-2 border-none rounded m-2 text-gray-800 transition duration-300 ease-in-out'
					onClick={handleDiscard}
				>
					Discard
				</button>
				<button
					type='submit'
					className='bg-green-500 rounded px-4 border-none m-2 text-gray-800'
					onClick={handleComment}
				>
					Post
				</button>
			</div>
		</div>
	);
};

export default AddComment;

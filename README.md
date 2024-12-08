# Full-Stack Blog App

A full-stack blog application powered by MongoDB with authentication, built using Node.js, Express, React, and TailwindCSS. The application allows users to view blog posts, add comments, and interact with the blog in real-time.

## Features

- User authentication (Login and Register).
- Add, view, and delete blog posts.
- Add, view, and manage comments on blog posts.
- Blog posts and comments are displayed in chronological order.
- Instant update of comments and blog posts without page reloads.
- Success and error messages displayed after submitting a comment.
- Hosted on Render for seamless deployment.

## Tech Stack

- **Frontend**: React, TailwindCSS, Axios
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Hosting**: Render (for both frontend and backend)
- **Environment Management**: `.env` for backend configurations

## Installation

### Prerequisites

- Node.js (version >= 14)
- MongoDB (either local or Atlas)
- A Render account for deployment
- JWT secret for authentication

### Backend Setup

1. Clone the repository:
   ```bash
   git clone <repo_url>
2. Navigate to the backend directory:
   ```bash
   cd backend
3. Install dependencies:
   ```bash
   npm install
4. Create a .env file in the root directory and set the necessary environment variables like:
   ```bash
    PORT=5000
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
5. Run the backend server locally:
   ```bash
   npm start
The backend will be running on http://localhost:5000.

### Frontend Setup

1. Clone the repository if not already done:
    ```bash
    git clone <repo_url>
2. Navigate to the frontend directory:
    ```bash
    cd frontend
3. Install dependencies:
   ```bash
   npm i
4. Run the frontend server locally:
   ```bash
   npm start or npm run dev
The frontend will be running on http://localhost:5174.

## Deployment
### Deploy Backend on Render
1. Sign up or log in to Render.
2. Create a new Web Service and connect it to the backend repository.
3. Set the environment variables in the Render dashboard:
  `MONGO_URI`: Your MongoDB connection string.
  `JWT_SECRET`: Your JWT secret.
4. Deploy the backend and get the deployed URL (e.g., https://your-backend.onrender.com).
5. Deploy Frontend on Render
6. Create a new Static Site on Render and connect it to the frontend repository.
7. Set the build command and publish directory as:
   Build Command: `npm run build`
  Publish Directory:`build/`
  Deploy the frontend and get the deployed URL (e.g., https://your-frontend.onrender.com).
### Usage
1. Ensure both the backend and frontend are deployed or running locally.
2. Open the frontend application in the browser (e.g., http://localhost:5174).
3. Users can log in or register to add blog posts and comments.
4. Blog posts are displayed with the ability to add and manage comments.
5. Comments are displayed in chronological order and updated instantly.
6. Error and success messages are displayed after submitting a comment.
### API Routes
POST `/api/auth/register`: Registers a new user.
  Body: `{ firstName, lastName, email, password }`
POST `/api/auth/login`: Logs in a user and returns a JWT token.
  Body: `{ email, password }`
GET `/api/blogs`: Fetches all blog posts.
POST `/api/blogs`: Adds a new blog post.
  Body: `{ title, content }`
Headers: `Authorization: Bearer <token>`
PUT `/api/users/:userId/blogs/:blogId/comment`: Adds a new comment to a blog post.

Body: `{ commentText }`
Headers: `Authorization: Bearer <token>`

## Code Structure
### Frontend
`src/components/AddComment.js`: Contains the logic for adding a comment.
`src/components/CommentCard.js`: Displays the blog comments.
`src/utils/api.js`: Contains the API call functions using Axios.
`src/pages/Blog.js`: The blog page where comments are displayed and added.
### Backend
`controllers/blogController.js`: Contains logic for handling blog posts and comments.
`controllers/authController.js`: Handles user authentication (login and register).
`models/Blog.js`: MongoDB schema for blog posts.
`models/User.js`: MongoDB schema for users.
`routes/blogRoutes.js`: Routes for handling blog post and comment API calls.
`routes/authRoutes.js`: Routes for authentication (login, register).
 
Feel free to use!

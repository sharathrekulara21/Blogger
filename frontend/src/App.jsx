import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BlogProvider } from "./context/BlogContext";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";

const App = () => {
	return (
		<>
			<AuthProvider>
				<BlogProvider>
					<Router>
						<Navbar />
						<Routes>
							<Route path='/' element={<HomePage />} />
							<Route path='/blogs/:id' element={<BlogPage />} />
							<Route path='/signup' element={<Signup />} />
							<Route path='/profile' element={<Profile />} />
						</Routes>
					</Router>
				</BlogProvider>
			</AuthProvider>
		</>
	);
};

export default App;

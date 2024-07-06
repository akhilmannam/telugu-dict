import React from "react";
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";

export const Login: React.FC = () => {
	const { login, isLoggedIn } = useAuth();

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
			{!isLoggedIn ? (
				<>
					<h2 className="text-3xl font-bold mb-8 text-gray-700">
						Log in to Your Account
					</h2>
					<button
						onClick={login}
						className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
					>
						<div className="flex items-center space-x-4 justify-center">
							<img
								src="https://www.svgrepo.com/show/475656/google-color.svg"
								className="w-5"
								alt="google logo"
							/>
							<span className="block w-max font-semibold tracking-wide text-gray-700 dark:text-white text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
								Continue with Google
							</span>
						</div>
					</button>
				</>
			) : (
				<Link
					to="/"
					className="block text-gray-700 hover:text-blue-600 transition-colors duration-300 mx-auto mt-4"
				>
					Go to Home
				</Link>
			)}
		</div>
	);
};

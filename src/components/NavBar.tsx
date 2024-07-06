import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IPage, IUser } from "../types";
import { useAuth } from "../context/useAuth";

const pages: Array<IPage> = [
	{
		page: "Home",
		navigate: "/",
	},
	{
		page: "Viral",
		navigate: "/viral",
	},
	{
		page: "New Additions",
		navigate: "/newlyadded",
	},
	{
		page: "Add New Word",
		navigate: "/add",
	},
];

const NavLinks: React.FC<{
	isOpen: boolean;
	onClose: () => void;
	isLoggedIn: boolean;
	logout: () => void;
	user: IUser | null;
}> = ({ isOpen, onClose, isLoggedIn, logout, user }) => {
	return (
		<nav
			className={`md:block fixed md:relative top-0 left-0 h-full md:h-auto w-64 md:w-auto bg-white md:bg-transparent transform ${
				isOpen ? "translate-x-0" : "-translate-x-full"
			} md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
		>
			<div className="flex justify-end p-4 md:hidden">
				<button
					onClick={onClose}
					className="text-gray-700 focus:outline-none"
				>
					<svg
						className="w-6 h-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
			<ul className="flex flex-col md:flex-row gap-4 p-4 md:p-0">
				{user && (
					<li className="md:hidden">
						<img
							src={user.picture}
							alt="profile"
							className="w-8 h-8 rounded-full"
						/>
						<span className="text-gray-700">{user.name}</span>
					</li>
				)}
				{pages.map((e: IPage) => (
					<li key={e.page}>
						<Link
							className="block text-gray-700 hover:text-blue-600 transition-colors duration-300"
							to={e.navigate}
							onClick={onClose}
						>
							{e.page}
						</Link>
					</li>
				))}
				{isLoggedIn ? (
					<li className="md:hidden">
						<button
							onClick={() => {
								onClose();
								logout();
							}}
							className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
						>
							Logout
						</button>
					</li>
				) : (
					<li>
						<Link
							to="/login"
							className="block text-gray-700 hover:text-blue-600 transition-colors duration-300"
						>
							Login
						</Link>
					</li>
				)}
			</ul>
		</nav>
	);
};

export const NavBar: React.FC = () => {
	const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const closeMenu = () => {
		setIsOpen(false);
	};

	return (
		<header className="flex items-center justify-between bg-amber-400 p-4 relative">
			<h1 className="basis-1/5 text-slate-900 cursor-pointer" onClick={() => navigate("/")}>తెD</h1>
			<div className="md:hidden">
				<button
					onClick={toggleMenu}
					className="text-gray-700 focus:outline-none"
				>
					<svg
						className="w-6 h-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16m-7 6h7"
						/>
					</svg>
				</button>
			</div>
			{isOpen && (
				<div
					onClick={closeMenu}
					className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40 md:hidden"
				/>
			)}
			<NavLinks
				isOpen={isOpen}
				onClose={closeMenu}
				isLoggedIn={isLoggedIn}
				logout={logout}
				user={user}
			/>
			{isLoggedIn && user && (
				<div className="hidden md:flex items-center space-x-4">
					<>
						<img
							src={user.picture}
							alt="profile"
							className="w-8 h-8 rounded-full"
						/>
						<span className="text-gray-700">{user.name}</span>
						<button
							onClick={logout}
							className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
						>
							Logout
						</button>
					</>
				</div>
			)}
		</header>
	);
};

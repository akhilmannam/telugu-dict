import React from "react";
import { INavBar, IPage } from "../types";

const pages: Array<IPage> = [
	{
		page: "Home",
		navigate: "Home",
	},
	{
		page: "Viral",
		navigate: "Viral",
	},
	{
		page: "New Additions",
		navigate: "NewAdditions",
	},
	{
		page: "Add New Word",
		navigate: "AddNew",
	},
];

const NavLinks: React.FC = () => {
	return (
		<nav className="basis-1/2">
			<ul className="flex gap-5 justify-center">
				{pages.map((e: IPage) => (
					<li key={e.page}>
						<a
							className="to-blue-500 hover:to-white"
							href={e.navigate}
						>
							{e.page}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

const Search: React.FC<INavBar> = ({ search, handleSearch }) => {
	return (
		<input
			value={search}
			onChange={handleSearch}
			type="text"
			placeholder="Search..."
			className="p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
		/>
	);
};

export const NavBar: React.FC<INavBar> = ({ search, handleSearch }) => {
	return (
		<header className="flex items-center bg-amber-400 p-4">
			<h1 className="basis-1/5">తెD</h1>
			<NavLinks />
			<Search search={search} handleSearch={handleSearch} />
		</header>
	);
};

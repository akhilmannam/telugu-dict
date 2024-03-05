import React from "react";
import { Link } from "react-router-dom";
import { IPage } from "../types";

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

const NavLinks: React.FC = () => {
	return (
		<nav>
			<ul className="flex gap-5 justify-center">
				{pages.map((e: IPage) => (
					<li className="p-2" key={e.page}>
						<Link
							className="to-blue-500 hover:to-white"
							to={e.navigate}
						>
							{e.page}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export const NavBar: React.FC = () => {
	return (
		<header className="flex items-center justify-between bg-amber-400 p-4">
			<h1 className="basis-1/5 text-slate-900">తెD</h1>
			<NavLinks />
		</header>
	);
};

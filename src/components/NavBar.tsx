import React, { useState } from "react";

interface Page {
	page: string;
	navigate: string;
}

const pages: Array<Page> = [
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
				{pages.map((e: Page) => (
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

const Search: React.FC = () => {
	const [search, setSearch] = useState<string>("");

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

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

export const NavBar: React.FC = () => {
	return (
		<header className="flex items-center bg-amber-400 p-4">
			<h1 className="basis-1/5">తెD</h1>
			<NavLinks />
			<Search />
		</header>
	);
};

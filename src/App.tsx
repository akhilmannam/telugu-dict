import { useState } from "react";
import "./App.css";
import { NavBar } from "./components/NavBar";
import { Words } from "./components/Words";
import { IWord } from "./types";

const defaultWords: Array<IWord> = [
	{
		heading: "Pacchi",
		meanings: [
			{ title: "Raw", usage: "Ee koora pachi ga undi" },
			{ title: "Wet", usage: "Ee batta pachi pachi ga undi" },
		],
	},
	{
		heading: "Pacchi Two",
		meanings: [
			{ title: "Raw", usage: "Ee koora pachi ga undi" },
			{ title: "Wet", usage: "Ee batta pachi pachi ga undi" },
		],
	},
	{
		heading: "Gunta",
		meanings: [
			{ title: "Hot Girl", usage: "Gunta bagundi" },
			{ title: "Hole", usage: "Mundu gunta undi chusko" },
		],
	},
	{
		heading: "Bokka",
		meanings: [
			{ title: "Waste", usage: "Time bokka" },
			{ title: "Hole", usage: "Pedda bokka" },
		],
	},
];

function App() {
	const [search, setSearch] = useState<string>("");
	const [words, setWords] = useState<Array<IWord>>(defaultWords);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearch(value);
		if (value && value.length > 0) {
			const filteredWords = words.filter((word: IWord) => {
				return word?.heading
					?.toLowerCase()
					?.includes(value?.toLowerCase());
			});
			setWords(filteredWords);
		} else {
			setWords(defaultWords);
		}
	};

	return (
		<>
			<NavBar search={search} handleSearch={handleSearch} />
			<Words words={words} />
		</>
	);
}

export default App;

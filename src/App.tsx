import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Words } from "./components/Words";
import { IMeaning, IWord } from "./types";
import { WorkInProgress } from "./components/WorkInProgress";
import { AddWord } from "./components/AddWord";
import { Layout } from "./components/Layout";

const defaultWords: Array<IWord> = [
	{
		id: 1,
		heading: "Pacchi",
		meanings: [
			{ id: 1, title: "Raw", usage: "Ee koora pachi ga undi" },
			{ id: 2, title: "Wet", usage: "Ee batta pachi pachi ga undi" },
		],
	},
	{
		id: 2,
		heading: "Gunta",
		meanings: [
			{ id: 1, title: "Girl", usage: "Gunta bagundi" },
			{ id: 2, title: "Hole", usage: "Mundu gunta undi chusko" },
		],
	},
	{
		id: 3,
		heading: "Bokka",
		meanings: [
			{ id: 1, title: "Waste", usage: "Time bokka" },
			{ id: 2, title: "Hole", usage: "Pedda bokka" },
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

	useEffect(() => {
    // Remove words with ban count greater than 10
		setWords(
			words.map((word: IWord) => {
				return {
					...word,
					meanings: word.meanings.filter(({ ban = 0 }: IMeaning) => {
						return ban < 10;
					}),
				};
			})
		);
	}, [words]);

	return (
		<Routes>
			<Route
				path="/"
				element={<Layout search={search} handleSearch={handleSearch} />}
			>
				<Route
					index
					element={<Words words={words} setWords={setWords} />}
				/>
				<Route path="/viral" element={<WorkInProgress />} />
				<Route path="/newlyadded" element={<WorkInProgress />} />
				<Route path="/add" element={<AddWord setWords={setWords} />} />
			</Route>
		</Routes>
	);
}

export default App;

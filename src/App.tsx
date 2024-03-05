import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Words } from "./components/Words";
import { IWord } from "./types";
import { WorkInProgress } from "./components/WorkInProgress";
import { AddWord } from "./components/AddWord";
import { Layout } from "./components/Layout";

function App() {
	const [defaultWords, setDefaultWords] = useState<Array<IWord>>([]);
	const [search, setSearch] = useState<string>("");
	const [words, setWords] = useState<Array<IWord>>([]);

	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route
					index
					element={
						<Words
							words={words}
							setWords={setWords}
							defaultWords={defaultWords}
							setDefaultWords={setDefaultWords}
							search={search}
							setSearch={setSearch}
						/>
					}
				/>
				<Route path="/viral" element={<WorkInProgress />} />
				<Route path="/newlyadded" element={<WorkInProgress />} />
				<Route path="/add" element={<AddWord words={words} />} />
			</Route>
		</Routes>
	);
}

export default App;

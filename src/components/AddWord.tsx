import React from "react";
import { IAddWord, IWord } from "../types";

export const AddWord: React.FC<IAddWord> = ({ setWords }) => {
	const [word, setWord] = React.useState<string>("");
	const [meaning, setMeaning] = React.useState<string>("");
	const [usage, setUsage] = React.useState<string>("");

	const handleSubmit = () => {
		setWords((w: Array<IWord>) => {
			return [
				...w,
				{
					id: w.length + 1,
					heading: word,
					meanings: [
						{
							id: 1,
							title: meaning,
							usage: usage,
						},
					],
				},
			];
		});
		setWord("");
		setMeaning("");
		setUsage("");
	};

	return (
		<div className="w-3/5 h-3/5 flex flex-col justify-center items-center my-0 mx-auto">
			<h3>Add a new word</h3>
			<input
				type="text"
				className="h-8 p-2 my-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 border-b-4"
				placeholder="Add a word"
				value={word}
				onChange={(e) => setWord(e.target.value)}
			/>
			<textarea
				placeholder="Add meaning of the word"
				className="h-32 p-2 my-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 border-b-4"
				value={meaning}
				onChange={(e) => setMeaning(e.target.value)}
			/>
			<textarea
				placeholder="Add usage of the word"
				className="h-32 p-2 rounded-md mt-4 border-2 border-gray-300 focus:outline-none focus:border-blue-500 border-b-4"
				value={usage}
				onChange={(e) => setUsage(e.target.value)}
			/>
			<button
				className="mt-2 bg-blue-500 border-transparent rounded-lg p-2"
				onClick={handleSubmit}
			>
				Submit
			</button>
		</div>
	);
};

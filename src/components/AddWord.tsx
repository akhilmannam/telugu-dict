import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "../utils/axiosConfig";
import { IAddWord, IWord } from "../types";

export const AddWord: React.FC<IAddWord> = ({ words }) => {
	const [word, setWord] = React.useState<string>("");
	const [meaning, setMeaning] = React.useState<string>("");
	const [usage, setUsage] = React.useState<string>("");
	const [msg, setMsg] = React.useState<string>("");

	const { mutateAsync } = useMutation({
		mutationFn: async (newWord: IWord) => {
			return await axios
				.post("/words", newWord)
				.then(() => {
					setMsg("Word added successfully");
					setWord("");
					setMeaning("");
					setUsage("");
				})
				.catch(() => {
					setMsg("Error adding word");
				})
				.finally(() => {
					setTimeout(() => {
						setMsg("");
					}, 3000);
				});
		},
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!word || !meaning || !usage) {
			setMsg("All fields are required");
			return;
		}
		mutateAsync({
			id: words.length + 1,
			heading: word,
			meanings: [
				{
					id: 1,
					title: meaning,
					usage: usage,
					likes: 0,
					dislikes: 0,
					ban: 0,
				},
			],
		});
	};

	return (
		<form
			title="Add a new word"
			className="w-3/5 h-3/5 flex flex-col justify-center items-center my-1 mx-auto"
			onSubmit={handleSubmit}
		>
			<label htmlFor="word">Word</label>
			<input
				type="text"
				className="h-8 p-2 my-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 border-b-4"
				placeholder="Add a word"
				value={word}
				name="word"
				onChange={(e) => setWord(e.target.value)}
			/>
			<label htmlFor="meaning">Meaning</label>
			<textarea
				placeholder="Add meaning of the word"
				className="h-32 p-2 my-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 border-b-4"
				value={meaning}
				name="meaning"
				onChange={(e) => setMeaning(e.target.value)}
			/>
			<label htmlFor="usage">Usage</label>
			<textarea
				placeholder="Add usage of the word"
				className="h-32 p-2 rounded-md mt-4 border-2 border-gray-300 focus:outline-none focus:border-blue-500 border-b-4"
				value={usage}
				name="usage"
				onChange={(e) => setUsage(e.target.value)}
			/>
			<button className="my-2 bg-blue-500 border-transparent rounded-lg p-2">
				Submit
			</button>
			{msg && <span className="mt-2">{msg}</span>}
		</form>
	);
};

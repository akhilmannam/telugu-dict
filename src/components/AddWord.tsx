import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "../utils/axiosConfig";
import { IAddWord, IWord } from "../types";
import { useAuth } from "../context/useAuth";
import { toast } from "react-toastify";
import { DEFAULT_OPTIONS } from "../utils/toast";
import { Link } from "react-router-dom";

export const AddWord: React.FC<IAddWord> = ({ words }) => {
	const [word, setWord] = React.useState<string>("");
	const [meaning, setMeaning] = React.useState<string>("");
	const [usage, setUsage] = React.useState<string>("");
	const [link, setLink] = React.useState<boolean>(false);
	const { isLoggedIn, user } = useAuth();

	const { mutateAsync } = useMutation({
		mutationFn: async (newWord: IWord) => {
			return await axios
				.post("/words", newWord)
				.then(() => {
					setWord("");
					setMeaning("");
					setUsage("");
					toast.success("Word added successfully", DEFAULT_OPTIONS);
					setLink(true);
				})
				.catch((error) => {
					toast.error(
						error?.response?.data?.message,
						DEFAULT_OPTIONS
					);
				});
		},
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!isLoggedIn) {
			toast.error("Please login to add a word", DEFAULT_OPTIONS);
		}

		if (!word || !meaning || !usage) {
			toast.warn("All fields are required", DEFAULT_OPTIONS);
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
					like: 0,
					dislike: 0,
					ban: 0,
				},
			],
			userId: user?.sub,
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
			{link && (
				<Link
					to="/"
					className="block text-gray-700 hover:text-blue-600 transition-colors duration-300 mx-auto mt-4"
				>
					Go to Home
				</Link>
			)}
		</form>
	);
};

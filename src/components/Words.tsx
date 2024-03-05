import React, { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../utils/axiosConfig";
import { IMeaning, IWord, IWords } from "../types";

export const Words: React.FC<IWords> = ({
	words,
	setWords,
	defaultWords,
	setDefaultWords,
	search,
	setSearch,
}) => {
	const [isEditing, setIsEditing] = React.useState<Record<
		string,
		unknown
	> | null>(null);
	const [meaning, setMeaning] = React.useState<string>("");
	const [usage, setUsage] = React.useState<string>("");
	const [msg, setMsg] = React.useState<string>("");
	const [interacted, setInteracted] = React.useState<number>(0);

	React.useEffect(() => {
		if (words) {
			const isEditing: Record<string, unknown> = {};
			words.forEach((word: IWord) => {
				isEditing[word.id] = false;
			});
			setIsEditing(isEditing);
		}
	}, [words]);

	const { data } = useQuery({
		queryKey: ["words", interacted],
		queryFn: () => axios.get("/words").then((res) => res.data), 
	});

	const { mutateAsync } = useMutation({
		mutationFn: async (updatedWord: { id: number; meaning: IMeaning }) => {
			return await axios
				.put(`/words/${updatedWord.id}`, updatedWord.meaning)
				.then(() => {
					setMeaning("");
					setUsage("");
					setIsEditing({
						...isEditing,
						[updatedWord.id]: false,
					});
				})
				.catch(() => {
					setMsg("Error adding meaning to the word");
				})
				.finally(() => {
					setTimeout(() => {
						setMsg("");
					}, 3000);
				});
		},
	});

	const { mutateAsync: interactionMutateAsync } = useMutation({
		mutationFn: async (interaction: {
			wordId: number;
			meaningId: number;
			type: "likes" | "dislikes" | "ban";
		}) => {
			return await axios.put(
				`/words/${interaction.wordId}-${interaction.meaningId}`,
				interaction
			).then(() => {
        setInteracted((i: number) => i + 1);
      })
		},
	});

	useEffect(() => {
		if (data) {
			setDefaultWords(data);
			setWords(data);
		}
	}, [data, setDefaultWords, setWords]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value: string = e.target.value;
		setSearch(value);
		if (value && value.length > 0) {
			const filteredWords = defaultWords.filter((word: IWord) => {
				return word?.heading
					?.toLowerCase()
					?.includes(value?.toLowerCase());
			});
			setWords(filteredWords);
		} else {
			setWords(defaultWords);
		}
	};

	const handleSubmit = (wordId: number) => {
		const existingWord = words.filter(
			(word: IWord) => word.id === wordId
		)?.[0];
		const newMeaning = {
			id: existingWord ? existingWord?.meanings.length + 1 : 1,
			title: meaning,
			usage: usage,
			likes: 0,
			dislikes: 0,
			ban: 0,
		};
		const updatedWord = {
			id: wordId,
			meaning: newMeaning,
		};
		mutateAsync(updatedWord);
	};

	const handleCancel = (wordId: number) => {
		setMeaning("");
		setUsage("");
		setIsEditing({
			...isEditing,
			[wordId]: false,
		});
	};

	const onInteract = (
		wordId: number,
		meaningId: number,
		type: "likes" | "dislikes" | "ban"
	) => {
		interactionMutateAsync({
			wordId,
			meaningId,
			type,
		});
	};

  // TODO - Fix the loading state
	// if (isLoading) {
	// 	return (
	// 		<div className="p-6 overflow-auto">
	// 			<h1>Loading...</h1>
	// 		</div>
	// 	);
	// }

	// if (words.length === 0) {
	// 	return (
	// 		<div className="p-6 overflow-auto">
	// 			<h1>No words found</h1>
	// 		</div>
	// 	);
	// }

	return (
		<div className="flex flex-col items-center justify-center">
			<input
				value={search}
				onChange={handleSearch}
				type="text"
				placeholder="Search..."
				className="p-2 my-3 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
			/>
			{words.map((word: IWord, index: number) => {
				const { id: wordId, heading, meanings = [] } = word;
				return (
					<div
						key={index}
						className="bg-white rounded-2xl shadow-md p-4 mb-4 min-w-96"
					>
						<h2 className="text-xl font-bold mb-2">{heading}</h2>
						<ul>
							{meanings.map(
								(
									{
										id: meaningId,
										title,
										usage,
										likes = 0,
										dislikes = 0,
										ban = 0,
									}: IMeaning,
									index: number
								) => (
									<li
										key={index}
										className="flex content-start gap-4 m-3"
									>
										<div className="w-5 h-5 mt-1 p-1">
											{index + 1}
										</div>
										<div>
											{title && (
												<h3 className="text-lg font-semibold mb-2 mt-1">
													{title}
												</h3>
											)}
											{usage && (
												<p className="mt-2 mb-2">
													{usage}
												</p>
											)}
											<ul className="flex gap-3 m-2 p-2">
												<li>
													<button
														onClick={() =>
															onInteract(
																wordId,
																meaningId,
																"likes"
															)
														}
														className="bg-blue-400 border p-2 rounded-md flex justify-between"
													>
														{likes > 0 && (
															<span className="p-1">
																{likes}
															</span>
														)}
														<span className="p-1">
															Like
														</span>
													</button>
												</li>
												<li>
													<button
														onClick={() =>
															onInteract(
																wordId,
																meaningId,
																"dislikes"
															)
														}
														className="bg-red-400 border p-2 rounded-md flex justify-between"
													>
														{dislikes > 0 && (
															<span className="p-1">
																{dislikes}
															</span>
														)}
														<span className="p-1">
															Dislike
														</span>
													</button>
												</li>
												<li>
													<button
														onClick={() =>
															onInteract(
																wordId,
																meaningId,
																"ban"
															)
														}
														className="bg-gray-400 border p-2 rounded-md flex justify-between"
													>
														{ban > 0 && (
															<span className="p-1">
																{ban}
															</span>
														)}
														<span className="p-1">
															Ban
														</span>
													</button>
												</li>
											</ul>
										</div>
									</li>
								)
							)}
						</ul>
						{isEditing && isEditing[wordId] ? (
							<div className="flex flex-col gap-3 m-4">
								<textarea
									placeholder="Add another meaning for the above word"
									className="h-32 p-2 my-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 border-b-4"
									value={meaning}
									onChange={(e) => setMeaning(e.target.value)}
								/>
								<textarea
									placeholder="Add another usage of the above word"
									className="h-32 p-2 rounded-md mt-4 border-2 border-gray-300 focus:outline-none focus:border-blue-500 border-b-4"
									value={usage}
									onChange={(e) => setUsage(e.target.value)}
								/>
								<div className="flex gap-3">
									<button
										className="mt-2 bg-blue-300 border-transparent rounded-lg p-2"
										onClick={() => handleSubmit(wordId)}
									>
										Submit
									</button>
									<button
										className="mt-2 bg-red-300 border-transparent rounded-lg p-2"
										onClick={() => handleCancel(wordId)}
									>
										Cancel
									</button>
								</div>

								{msg && <span className="mt-2">{msg}</span>}
							</div>
						) : (
							<button
								onClick={() =>
									setIsEditing({
										...isEditing,
										[wordId]: true,
									})
								}
								className="bg-orange-300 border m-4 p-2 rounded-md"
							>
								Add New Definition
							</button>
						)}
					</div>
				);
			})}
		</div>
	);
};

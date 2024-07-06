import React, { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../utils/axiosConfig";
import { IMeaning, IWord, IWords } from "../types";
import { useAuth } from "../context/useAuth";
import { toast } from "react-toastify";
import { DEFAULT_OPTIONS } from "../utils/toast";

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
	const [interacted, setInteracted] = React.useState<number>(0);
	const { isLoggedIn, user } = useAuth();

	useEffect(() => {
		if (words) {
			const isEditing: Record<string, unknown> = {};
			words.forEach((word: IWord) => {
				isEditing[word.id] = false;
			});
			setIsEditing(isEditing);
		}
	}, [words]);

	const { data, isLoading } = useQuery({
		queryKey: ["words", interacted],
		queryFn: () => axios.get("/words").then((res) => res.data),
	});

	const { mutateAsync } = useMutation({
		mutationFn: async (updatedWord: {
			id: number;
			meaning: IMeaning;
			userId: string | undefined;
		}) => {
			const token = localStorage.getItem("token");
			return await axios
				.put(`/words/${updatedWord.id}`, updatedWord.meaning, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then(() => {
					setMeaning("");
					setUsage("");
					setIsEditing({
						...isEditing,
						[updatedWord.id]: false,
					});
					setInteracted((i: number) => i + 1);
				})
				.catch(() => {
					toast.error(
						"Error adding meaning to the word",
						DEFAULT_OPTIONS
					);
				});
		},
	});

	const { mutateAsync: interactionMutateAsync } = useMutation({
		mutationFn: async (interaction: {
			wordId: number;
			meaningId: number;
			type: "like" | "dislike" | "ban";
			userId: string | undefined;
		}) => {
			const token = localStorage.getItem("token");
			return await axios
				.put(
					`/words/${interaction.wordId}-${interaction.meaningId}`,
					interaction,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				.then(() => {
					setInteracted((i: number) => i + 1);
				})
				.catch((error) => {
					toast.error(
						error?.response?.data?.message,
						DEFAULT_OPTIONS
					);
				});
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
		if (!isLoggedIn) {
			toast.error("Please login to add a meaning", DEFAULT_OPTIONS);
			return;
		}

		const existingWord = words.filter(
			(word: IWord) => word.id === wordId
		)?.[0];

		const newMeaning = {
			id: existingWord ? existingWord?.meanings.length + 1 : 1,
			title: meaning,
			usage: usage,
			like: 0,
			dislike: 0,
			ban: 0,
		};
		const updatedWord = {
			id: wordId,
			meaning: newMeaning,
			userId: user?.sub,
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
		type: "like" | "dislike" | "ban"
	) => {
		if (!isLoggedIn) {
			toast.error(
				"Please login to interact",
				DEFAULT_OPTIONS
			);
			return;
		}

		const interaction = {
			wordId,
			meaningId,
			type,
			userId: user?.sub,
		};

		try {
			interactionMutateAsync(interaction);
		} catch (error) {
			toast.error(JSON.stringify(error), DEFAULT_OPTIONS);
		}
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
			{!isLoading && words ? (
				words.map((word: IWord, index: number) => {
					const { id: wordId, heading, meanings = [] } = word;
					return (
						<div
							key={index}
							className="bg-white rounded-2xl shadow-md p-4 mb-4 min-w-96"
						>
							<h2 className="text-xl font-bold mb-2">
								{heading}
							</h2>
							<ul>
								{meanings.map(
									(
										{
											id: meaningId,
											title,
											usage,
											like = 0,
											dislike = 0,
											ban = 0,
										},
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
																	"like"
																)
															}
															className="bg-blue-400 border p-2 rounded-md flex justify-between"
														>
															{like > 0 && (
																<span className="p-1">
																	{like}
																</span>
															)}
															<span className="p-1">
																{like > 1
																	? "Likes"
																	: "Like"}
															</span>
														</button>
													</li>
													<li>
														<button
															onClick={() =>
																onInteract(
																	wordId,
																	meaningId,
																	"dislike"
																)
															}
															className="bg-red-400 border p-2 rounded-md flex justify-between"
														>
															{dislike > 0 && (
																<span className="p-1">
																	{dislike}
																</span>
															)}
															<span className="p-1">
																{dislike > 1
																	? "Dislikes"
																	: "Dislike"}
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
																{ban > 1
																	? "Bans"
																	: "Ban"}
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
										onChange={(e) =>
											setMeaning(e.target.value)
										}
									/>
									<textarea
										placeholder="Add another usage of the above word"
										className="h-32 p-2 rounded-md mt-4 border-2 border-gray-300 focus:outline-none focus:border-blue-500 border-b-4"
										value={usage}
										onChange={(e) =>
											setUsage(e.target.value)
										}
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
				})
			) : (
				<div role="status">
					<svg
						aria-hidden="true"
						className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
						viewBox="0 0 100 101"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="currentColor"
						/>
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="currentFill"
						/>
					</svg>
					<span className="sr-only">Loading...</span>
				</div>
			)}
		</div>
	);
};

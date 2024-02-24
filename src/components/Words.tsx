import React from "react";
import { IMeaning, IWord, IWords } from "../types";

export const Words: React.FC<IWords> = ({ words, setWords }) => {
	const [isEditing, setIsEditing] = React.useState<boolean>(false);
	const [meaning, setMeaning] = React.useState<string>("");
	const [usage, setUsage] = React.useState<string>("");

	const handleSubmit = (wordId: number) => {
		setWords((w: Array<IWord>) => {
			return w.map((word: IWord) => {
				if (word.id === wordId) {
					return {
						...word,
						meanings: [
							...word.meanings,
							{
								id: word.meanings.length + 1,
								title: meaning,
								usage: usage,
							},
						],
					};
				}
				return word;
			});
		});
		setIsEditing(false);
	};

	const onInteract = (
		wordId: number,
		meaningId: number,
		type: "like" | "dislike" | "ban"
	) => {
		setWords((w: Array<IWord>) => {
			return w.map((word: IWord) => {
				if (word.id === wordId) {
					if (type === "like") {
						return {
							...word,
							meanings: word.meanings.map((meaning: IMeaning) => {
								if (meaning.id === meaningId)
									return {
										...meaning,
										likes: meaning.likes
											? meaning.likes + 1
											: 1,
									};
								else return meaning;
							}),
						};
					} else if (type === "dislike") {
						return {
							...word,
							meanings: word.meanings.map((meaning: IMeaning) => {
								if (meaning.id === meaningId)
									return {
										...meaning,
										dislikes: meaning.dislikes
											? meaning.dislikes + 1
											: 1,
									};
								else return meaning;
							}),
						};
					} else {
						return {
							...word,
							meanings: word.meanings.map((meaning: IMeaning) => {
								if (meaning.id === meaningId)
									return {
										...meaning,
										ban: meaning.ban ? meaning.ban + 1 : 1,
									};
								else return meaning;
							}),
						};
					}
				}
				return word;
			});
		});
	};

	if (words.length === 0) {
		return (
			<div className="p-6 overflow-auto">
				<h1>No words found</h1>
			</div>
		);
	}

	return (
		<div className="p-6 overflow-auto">
			{words.map((word: IWord, index: number) => {
				const { id: wordId, heading, meanings = [] } = word;
				return (
					<div
						key={index}
						className="bg-white rounded-lg shadow-md p-4 mb-4"
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
																"like"
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
																"dislike"
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
						{isEditing ? (
							<div className="w-1/3 flex flex-col gap-3 m-4">
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
								<button
									className="mt-2 bg-blue-500 border-transparent rounded-lg p-2"
									onClick={() => handleSubmit(wordId)}
								>
									Submit
								</button>
							</div>
						) : (
							<button
								onClick={() => setIsEditing(true)}
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

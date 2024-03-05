export interface IMeaning {
	id: number;
	title: string;
	usage: string;
	likes: number;
	dislikes: number;
	ban: number;
	handleInteractions?: (
		wordId: number,
		meaningId: number,
		type: "like" | "dislike" | "ban"
	) => void | undefined;
}

export interface IWord {
	id: number;
	heading: string;
	meanings: Array<IMeaning>;
}

export interface IWords {
	words: Array<IWord>;
	setWords: React.Dispatch<React.SetStateAction<IWord[]>>;
	defaultWords: Array<IWord>;
	setDefaultWords: React.Dispatch<React.SetStateAction<IWord[]>>;
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export interface IPage {
	page: string;
	navigate: string;
}

export interface IAddWord {
	words: Array<IWord>;
	setWords?: React.Dispatch<React.SetStateAction<IWord[]>>;
}

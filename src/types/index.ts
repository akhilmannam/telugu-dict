export interface IMeaning {
	id: number;
	title: string;
	usage: string;
	like: number;
	dislike: number;
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
	userId?: string | undefined;
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

export interface AuthContextType {
	isLoggedIn: boolean;
	login: () => void;
	logout: () => void;
	user: IUser | null;
}

export interface IUser {
	sub: string;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
	email: string;
	email_verified: boolean;
}

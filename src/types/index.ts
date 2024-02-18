export interface IMeaning {
	title: string;
	usage: string;
}

export interface IWord {
	heading: string;
	meanings: Array<IMeaning>;
}

export interface IWords {
	words: Array<IWord>;
}

export interface IPage {
	page: string;
	navigate: string;
}

export interface INavBar {
	search: string;
	handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

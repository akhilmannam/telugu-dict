import React from "react";

interface WordProps {
	heading: string;
	meanings: Array<Meaning>;
}

interface Meaning {
	title: string;
	usage: string;
}

const Word: React.FC<WordProps> = ({ heading, meanings }) => {
	return (
		<div className="bg-white rounded-lg shadow-md p-4 mb-4">
			<h2 className="text-xl font-bold mb-2">{heading}</h2>
			<ul>
				{meanings.map((meaning: Meaning, index: number) => (
					<li key={index} className="flex content-start gap-4">
						<div className="w-4 h-4 mt-2">{index + 1}</div>
						<div>
							<h3 className="text-lg font-semibold mb-2">
								{meaning.title}
							</h3>
							<p>{meaning.usage}</p>
							<ul className="flex gap-3">
								<li>
									<button>Like</button>
								</li>
								<li>
									<button>Dislike</button>
								</li>
								<li>
									<button>Ban</button>
								</li>
							</ul>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export const Words: React.FC = () => {
	const words = [
		{
			heading: "Pacchi",
			meanings: [
				{ title: "Raw", usage: "Ee koora pachi ga undi" },
				{ title: "Wet", usage: "Ee batta pachi pachi ga undi" },
			],
		},
		{
			heading: "Gunta",
			meanings: [
				{ title: "Hot Girl", usage: "Gunta bagundi" },
				{ title: "Hole", usage: "Mundu gunta undi chusko" },
			],
		},
		{
			heading: "Bokka",
			meanings: [
				{ title: "Waste", usage: "Time bokka" },
				{ title: "Hole", usage: "Pedda bokka" },
			],
		},
	];

	return (
		<div className="p-6 overflow-auto">
			{words.map((word, index) => (
				<Word
					key={index}
					heading={word.heading}
					meanings={word.meanings}
				/>
			))}
		</div>
	);
};

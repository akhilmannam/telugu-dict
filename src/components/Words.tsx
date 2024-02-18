import React from "react";
import { IMeaning, IWord, IWords } from "../types";

const Word: React.FC<IWord> = ({ heading, meanings }) => {
	return (
		<div className="bg-white rounded-lg shadow-md p-4 mb-4">
			<h2 className="text-xl font-bold mb-2">{heading}</h2>
			<ul>
				{meanings.map((meaning: IMeaning, index: number) => (
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
			<button className="">Add New Definition</button>
		</div>
	);
};

export const Words: React.FC<IWords> = ({ words }) => {

  if (words.length === 0) {
    return (
      <div className="p-6 overflow-auto">
        <h1>No words found</h1>
      </div>
    );
  }

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

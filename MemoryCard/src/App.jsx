import { useState } from "react";
import "./App.css";
import Card from "./components/Card";

const cards = [
	{
		id: crypto.randomUUID(),
		title: "Toot Toot",
		img: "",
	},
    	{
		id: crypto.randomUUID(),
		title: "Toot Toot",
		img: "",
	},
    	{
		id: crypto.randomUUID(),
		title: "Toot Toot",
		img: "",
	},
    	{
		id: crypto.randomUUID(),
		title: "Toot Toot",
		img: "",
	},
];

function resetClickedCards() {
	const obj = {};
	for (const card of cards) {
		obj[card.id] = false;
	}
	return obj;
}

function App() {
	const [currentScore, setCurrentScore] = useState(0);
	const [highScore, setHighScore] = useState(0);
	const [clickedCards, setClickedCards] = useState(resetClickedCards());

	function handleCardClick(id) {
		if (clickedCards[id]) {
			setCurrentScore(0);
			setClickedCards(resetClickedCards());
		} else {
			setClickedCards((prev) => {
				return { ...prev, [id]: true };
			});
			const updatedScore = currentScore + 1;
			setCurrentScore(updatedScore);
			if (updatedScore > highScore) setHighScore(updatedScore);
		}
	}

	return (
		<div className="wrapper">
			<div className="scoreboard">
				<p>Current Score: {currentScore}</p>
				<p>High Score: {highScore}</p>
			</div>
			<div className="board">
				{cards.map((card) => {
					return (
						<Card
							id={card.id}
							title={card.title}
							img={card.img}
							handleCardClick={handleCardClick}
							key={card.id}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default App;

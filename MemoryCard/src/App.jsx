import { useState } from "react";
import "./App.css";
import Card from "./components/Card";

import frogdripJPG from "./assets/Frogdrip.jpg"
import haybalerJPG from "./assets/Haybaler.jpg"
import demonboneJPG from "./assets/Demonbone.jpg"
import dirgeJPG from "./assets/Dirge.jpg"
import dreadhowlJPG from "./assets/Dreadhowl.jpg"
import jacynthJPG from "./assets/Jacynth.jpg"
import januaryJPG from "./assets/January.jpg"
import spectroJPG from "./assets/Spectro.jpg"
import wizJPG from "./assets/Wiz.jpg"
import zephirahJPG from "./assets/Zephirah.jpg"

const initialCards = [
	{
		id: crypto.randomUUID(),
		title: "Frogdrip",
		img: frogdripJPG,
	},
	{
		id: crypto.randomUUID(),
		title: "Haybaler",
		img: haybalerJPG,
	},
	{
		id: crypto.randomUUID(),
		title: "January",
		img: januaryJPG,
	},
	{
		id: crypto.randomUUID(),
		title: "Demonbone",
		img: demonboneJPG,
	},
	{
		id: crypto.randomUUID(),
		title: "Zephirah",
		img: zephirahJPG,
	},
	{
		id: crypto.randomUUID(),
		title: "Dirge",
		img: dirgeJPG,
	},
	{
		id: crypto.randomUUID(),
		title: "Jacynth",
		img: jacynthJPG,
	},
	{
		id: crypto.randomUUID(),
		title: "Dreadhowl",
		img: dreadhowlJPG,
	},
	{
		id: crypto.randomUUID(),
		title: "Spectro",
		img: spectroJPG,
	},
	{
		id: crypto.randomUUID(),
		title: "Wiz",
		img: wizJPG,
	},
];

function shuffleArray(array) {
	const arr = [...array];
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

function resetClickedCards(cardsArr) {
	const obj = {};
	for (const card of cardsArr) {
		obj[card.id] = false;
	}
	return obj;
}

function App() {
	const [cards, setCards] = useState(initialCards);
	const [currentScore, setCurrentScore] = useState(0);
	const [highScore, setHighScore] = useState(0);
	const [clickedCards, setClickedCards] = useState(resetClickedCards(initialCards));

	function handleCardClick(id) {
		if (clickedCards[id]) {
			setCurrentScore(0);
			setClickedCards(resetClickedCards(cards));
		} else {
			setClickedCards((prev) => {
				return { ...prev, [id]: true };
			});
			const updatedScore = currentScore + 1;
			setCurrentScore(updatedScore);
			if (updatedScore > highScore) setHighScore(updatedScore);
		}
		// Shuffle cards after every click
		setCards((prevCards) => shuffleArray(prevCards));
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

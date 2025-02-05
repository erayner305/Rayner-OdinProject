const gameButtons = document.querySelector("#game_buttons");
gameButtons.addEventListener("click", (event) => {
	let choice = event.target.id;
	playRound(choice);
});

let options = ["rock", "paper", "scissors"];
let humanScore = 0;
let computerScore = 0;
let isGameOver = false;

function getComputerChoice() {
	let randomIndex = Math.floor(Math.random() * 3);
	return options[randomIndex];
}

function capitalize(word) {
	word = word.toLowerCase();
	return word.charAt(0).toUpperCase() + word.slice(1);
}

function setScoreboard(parent) {
	const scoreboardText = `Human Score: ${humanScore} | Computer Score: ${computerScore}`;

	const scoreboard = parent.querySelector("#scoreboard");
	scoreboard.textContent = scoreboardText;
}

function playRound(humanChoice) {
	if (!isGameOver) {
		let computerChoice = getComputerChoice();
		let outcome = "";

		if (humanChoice == "rock") {
			if (computerChoice == "rock") {
				outcome = "tied";
			} else if (computerChoice == "paper") {
				outcome = "lost";
			} else if (computerChoice == "scissors") {
				outcome = "won";
			}
		} else if (humanChoice == "paper") {
			if (computerChoice == "rock") {
				outcome = "won";
			} else if (computerChoice == "paper") {
				outcome = "tied";
			} else if (computerChoice == "scissors") {
				outcome = "lost";
			}
		} else if (humanChoice == "scissors") {
			if (computerChoice == "rock") {
				outcome = "lost";
			} else if (computerChoice == "paper") {
				outcome = "won";
			} else if (computerChoice == "scissors") {
				outcome = "tied";
			}
		}

		if (outcome == "won") {
			humanScore += 1;
		} else if (outcome == "lost") {
			computerScore += 1;
		}

		let resultString = `You ${outcome} this round! ${
			outcome == "tied"
				? ""
				: `${
						outcome == "won"
							? capitalize(humanChoice)
							: capitalize(computerChoice)
				  } beats ${outcome == "won" ? computerChoice : humanChoice}.`
		}`;

		const gameResults = document.querySelector("#game_results");

		const roundResults = gameResults.querySelector("#round_results");
		roundResults.textContent = resultString;

		setScoreboard(gameResults);

		if (humanScore == 5 || computerScore == 5) {
			const gameOver = document.createElement("p");
			isGameOver = true;

			if (humanScore == 5) {
				gameOver.textContent = "You win!";
			} else {
				gameOver.textContent = "The computer wins!";
			}

			const playAgain = document.createElement("button");
			playAgain.textContent = "Play Again?";
			playAgain.addEventListener("click", () => {
				humanScore = 0;
				computerScore = 0;
				isGameOver = false;

                roundResults.textContent = "";
                setScoreboard(gameResults);
				gameResults.removeChild(gameOver);
				gameResults.removeChild(playAgain);
			});

			gameResults.appendChild(gameOver);
			gameResults.appendChild(playAgain);
		}

		return resultString;
	}
}

// function playGame() {
//     for(i = 0; i < 5; i++) {
//         playRound();
//     }
//     let resultString = `${humanScore > computerScore ? "Winner!" : humanScore == computerScore ? "Tied!" : "Lost!"}`

//     console.log(resultString)

//     return resultString
// }

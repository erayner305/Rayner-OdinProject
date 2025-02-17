console.log("Use gameController.help() for some useful commands");

/**
 * gameController is responsible for monitoring the flow
 * of the game
 */

let gameController = function (player1name, player2name) {
	const MAX_ROUNDS = 9;
	const PLAYER_1_SYMBOL = "X";
	const PLAYER_2_SYMBOL = "O";
	let currentPlayer, currentRound;

	/**
	 * player keeps track of each player and their score
	 */
	let player = function (symbol, name) {
		let score = 0;

		const getSymbol = () => symbol;
		const getName = () => name;
		const getScore = () => score;
		const incrementScore = () => score++;

		return { getSymbol, getName, getScore, incrementScore };
	};

	let player1 = player(PLAYER_1_SYMBOL, player1name || "Player 1");
	let player2 = player(PLAYER_2_SYMBOL, player2name || "Player 2");

	/**
	 * gameBoard represents the state of the board
	 * Each entry in the board array represents a cell
	 * " " indicates an empty cell
	 */

	let gameBoard = (function () {
		const blankBoard = [
			[" ", " ", " "],
			[" ", " ", " "],
			[" ", " ", " "],
		];

		let board = JSON.parse(JSON.stringify(blankBoard));

		const getBoard = () => board;
		const reset = () => {
			board = JSON.parse(JSON.stringify(blankBoard));
		};
		const replaceCell = (player, [cellRow, cellColumn]) => {
			if (board[cellRow][cellColumn] == " ") {
				board[cellRow][cellColumn] = player.getSymbol();
				return true;
			} else {
				return false;
			}
		};
		return { getBoard, reset, replaceCell };
	})();

	const playRound = () => {
		console.log(`${currentPlayer.getName()}'s Turn!`);
		gameBoard.getBoard().forEach((row) => {
			console.log(row);
		});
		return currentPlayer.getSymbol();
	};

	const getCurrentPlayer = () => currentPlayer.getName();
	const getCurrentRound = () => currentRound;
	const getPlayers = () => [player1, player2];

	const chooseCell = (cellRow, cellColumn) => {
		let gameState = {
			symbol: currentPlayer.getSymbol(),
			isGameOver: false,
			winner: null,
		};

		let success = gameBoard.replaceCell(currentPlayer, [cellRow, cellColumn]);
		if (success) {
			currentRound++;
			if (currentRound <= 9) {
				// No need to check before this since it's impossible
				if (currentRound >= 6) {
					if (checkWinCondition()) {
						currentPlayer.incrementScore();
						console.log(
							`${currentPlayer.getName()} Wins! Score is ${player1.getScore()} to ${player2.getScore()}`
						);
						gameState.isGameOver = true;
						gameState.winner = currentPlayer.getName();
						return gameState;
					}
				}
				currentPlayer = currentRound % 2 == 0 ? player2 : player1;
				playRound();
				return gameState;
			} else {
				if (checkWinCondition()) {
					currentPlayer.incrementScore();
					gameState.winner = currentPlayer.getName();
				}

				gameState.isGameOver = true;
				return gameState;
			}
		} else {
			gameState.symbol = "";
			return gameState;
		}
	};

	const resetGame = () => {
		gameBoard.reset();
		startGame();
	};

	const checkWinCondition = () => {
		const board = gameBoard.getBoard();
		const winningCombinations = [
			// Rows
			[board[0][0], board[0][1], board[0][2]],
			[board[1][0], board[1][1], board[1][2]],
			[board[2][0], board[2][1], board[2][2]],
			// Columns
			[board[0][0], board[1][0], board[2][0]],
			[board[0][1], board[1][1], board[2][1]],
			[board[0][2], board[1][2], board[2][2]],
			// Diagonals
			[board[0][0], board[1][1], board[2][2]],
			[board[0][2], board[1][1], board[2][0]],
		];

		return winningCombinations.some((combination) => {
			return (
				combination.every((cell) => cell === "X") ||
				combination.every((cell) => cell === "O")
			);
		});
	};

	const help = () => {
		console.log(
			`use gameController.chooseCell(cellRow, cellColumn) to enter where you would like your symbol to go`
		);
		console.log(
			`use gameController.resetGame() to clear the board and players`
		);
	};

	const startGame = () => {
		currentPlayer = player1;
		currentRound = 1;
		console.log(
			`Game started between ${player1.getName()} (X) and ${player2.getName()} (O)`
		);
		return playRound();
	};

	startGame();

	return {
		getCurrentPlayer,
		getCurrentRound,
		getPlayers,
		chooseCell,
		resetGame,
		help,
	};
};

let displayController = function () {
	let gameBoardElem = document.querySelector(".game-board");
	let gameInstance;

	const createBoard = function (localGameInstance) {
		gameInstance = gameInstance || localGameInstance;
		gameBoardElem.innerHTML = "";
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				let cell = document.createElement("div");
				cell.setAttribute("class", "cell");
				cell.setAttribute("data-cell-x", i);
				cell.setAttribute("data-cell-y", j);

				gameBoardElem.appendChild(cell);
			}
		}

		gameBoardElem.addEventListener("click", (event) => {
			let cellElem = event.target;

			if (cellElem.textContent == "") {
				let cellPosition = {
					x: cellElem.getAttribute("data-cell-x"),
					y: cellElem.getAttribute("data-cell-y"),
				};

				let gameState = gameInstance.chooseCell(cellPosition.x, cellPosition.y);
				cellElem.textContent = gameState.symbol;
				if (gameState.isGameOver) {
					let scoreboardElem = document.querySelector(".game-over-controls");
					let winnerElem = scoreboardElem.querySelector("[data-winner]");
					let scoreElem = scoreboardElem.querySelector("[data-score]");
					let playersElem = scoreboardElem.querySelector("[data-players]");

					let players = gameInstance.getPlayers();
					winnerElem.textContent =
						gameState.winner != null ? `${gameState.winner} Wins!` : `Tie!`;
					scoreElem.textContent = `${players[0].getScore()} - ${players[1].getScore()}`;
					playersElem.textContent = `${players[0].getName()} ${players[1].getName()}`;
					gameInstance.resetGame();
					scoreboardElem.showModal();
				}
			}
		});
	};

	return { createBoard };
};

let display = displayController();

let gameControllsElem = document.querySelector(".game-controls");
let startButton = gameControllsElem.querySelector("#start_game");

startButton.addEventListener("click", (event) => {
	event.preventDefault();
	gameControllsElem.close();
	let player1name =
		startButton.parentNode.parentNode.querySelector("#player1").value;
	let player2name =
		startButton.parentNode.parentNode.querySelector("#player2").value;
	let game = gameController(player1name, player2name);
	display.createBoard(game);
});

let gameOverControllsElem = document.querySelector(".game-over-controls");
let resetButton = gameOverControllsElem.querySelector("#reset_game");

resetButton.addEventListener("click", (event) => {
	event.preventDefault();
	gameOverControllsElem.close();

	display.createBoard();
});

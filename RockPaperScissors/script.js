let options = ["rock", "paper", "scissors"];
let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
    let randomIndex = Math.floor(Math.random() * 3);
    return options[randomIndex];
}

function getHumanChoice() {
    try {
        let answer = prompt("Rock, Paper, or Scissors?");
        return answer.toLowerCase();
    } catch {

    }
}

function capitalize(word) {
    word = word.toLowerCase()
    return word.charAt(0).toUpperCase() + word.slice(1)
}

function playRound() {
    let humanChoice = getHumanChoice();
    if (humanChoice == "" || humanChoice == undefined) {
        return "Come again!"
    }
    let computerChoice = getComputerChoice();
    let outcome = ""

    if (humanChoice == "rock") {
        if (computerChoice == "rock") {
            outcome = "tied"
        } else if (computerChoice == "paper") {
            outcome = "lost"
        } else if (computerChoice == "scissors") {
            outcome = "won"
        }
    } else if (humanChoice == "paper") {
        if (computerChoice == "rock") {
            outcome = "won"
        } else if (computerChoice == "paper") {
            outcome = "tied"
        } else if (computerChoice == "scissors") {
            outcome = "lost"
        }
    } else if (humanChoice == "scissors") {
        if (computerChoice == "rock") {
            outcome = "lost"
        } else if (computerChoice == "paper") {
            outcome = "won"
        } else if (computerChoice == "scissors") {
            outcome = "tied"
        }
    } else {
        outcome = "lost";
    }

    if (outcome == "won") {
        humanScore += 1;
    } else if (outcome == "lost") {
        computerScore += 1;
    }

    let resultString = `You ${outcome}! ${outcome=="tied" ? "" : `${outcome=="won" ? capitalize(humanChoice) : capitalize(computerChoice)} beats ${outcome=="won" ? computerChoice : humanChoice}.`}`

    console.log(resultString)
    console.log(`Human Score: ${humanScore} | Computer Score: ${computerScore}`)

    return resultString
}

function playGame() {
    for(i = 0; i < 5; i++) {
        playRound();
    }
    let resultString = `${humanScore > computerScore ? "Winner!" : humanScore == computerScore ? "Tied!" : "Lost!"}`

    console.log(resultString)

    return resultString
}
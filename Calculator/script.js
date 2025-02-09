let num1 = 0;
let num2 = 0;
let operator = "";

function operate(a, b, operator) {
    if (a == "NaN") {
        a = 0;
    }

    if (b == "NaN") {
        b = 0;
    }
    
	let result = b;
	switch (operator) {
		case "+":
			result = a + b;
			break;
		case "-":
			result = a - b;
			break;
		case "x":
			result = a * b;
			break;
		case "/":
            if (b != 0) {
                result = a / b;
            }
			break;
	}
	console.log(`${result} from ${a} ${operator} ${b} `);
	return Math.round(result * 100) / 100;
}

let container = document.querySelector("#container");
let numbers = document.querySelector("#numbers");
let functions = document.querySelector("#functions");
let clear = document.querySelector("#button_clear");
let display = document.querySelector("#display");

numbers.addEventListener("click", (event) => {
	let targetButton = event.target;
	if (targetButton && targetButton.id.startsWith("button_")) {
		if (targetButton.textContent == ".") {
			if (!display.textContent.includes(".")) {
                display.textContent += targetButton.textContent;
			}
		} else {   
            display.textContent += targetButton.textContent;
		}	
	}
});

functions.addEventListener("click", (event) => {
	let targetButton = event.target;
	if (targetButton && targetButton.id.startsWith("button_")) {
		if (targetButton.textContent == "=") {
			console.log("EQUALS");
			num2 = parseFloat(display.textContent).toFixed(2);
			let result = operate(num1, num2, operator);
			display.textContent = result;
			num1 = result;
			num2 = 0;
			operator = "";
		} else {
			num1 = parseFloat(display.textContent).toFixed(2);
			operator = targetButton.textContent;
			display.textContent = "";
		}
	}
});

clear.addEventListener("click", (event) => {
	let targetButton = event.target;
	if (targetButton && targetButton.id.startsWith("button_")) {
        if (display.textContent = "") {
            num1 = 0;
            num2 = 0;
            operator = "";
        } 
        display.textContent = "";
		
	}
});

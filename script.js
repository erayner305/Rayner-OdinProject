// Function Practice
// function add7(number) {
//     return number + 7
// }

// function multiply(x, y) {
//     return x * y
// }

// function capitalize(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
// }

// function lastLetter(string) {
//     return string.charAt(string.length - 1)
// }

// console.log(add7(3)) // Expect 10
// console.log(multiply(2, 3)) // Expect 6
// console.log(capitalize("bruVh")) // Expect Bruvh
// console.log(lastLetter("dang")) // Expect g

// Fizz Buzz
function fizzBuzz() {
    let answer = parseInt(prompt("Enter number you'd like to fizzbuzz to"));
    let output = ""

    for (let i = 1; i <= answer; i++) {
        if (i % 3 == 0 || i % 5 == 0) {
            output = ""
            if (i % 3 == 0) {
                output += "Fizz"
            }
            if (i % 5 == 0) {
                output += "Buzz"
            } 
        } else {
            output = i
        }
        console.log(output);
    }
    // Add your FizzBuzz logic here
}







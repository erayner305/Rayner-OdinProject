// function countDownRecursive(n) {
// 	if (n > 0) {
// 		console.log(n);
// 		countDownRecursive(n - 1);
// 	} else {
// 		console.log("Hooray!");
// 	}
// }

// countDownRecursive(2);

// function sumRangeRecursive(n, total = 0) {
// 	if (n <= 0) {
// 		return total;
// 	} else {
// 		return sumRangeRecursive(n - 1, total + n);
// 	}
// }

// console.log(sumRangeRecursive(6));

// const tree = {
// 	name: "John",
// 	children: [
// 		{
// 			name: "Jim",
// 			children: [],
// 		},
// 		{
// 			name: "Zoe",
// 			children: [
// 				{
// 					name: "Kyle",
// 					children: [],
// 				},
// 				{
// 					name: "Sophia",
// 					children: [],
// 				},
// 			],
// 		},
// 	],
// };

// function printChildrenRecursive(parent) {
//     if (parent.children == []) {
//         return parent.name
//     }

//     parent.children.forEach((child) => {
//         console.log(child.name);
//         printChildrenRecursive(child);
//     })
// }

// printChildrenRecursive(tree)

// function factorial(n) {
//     if (n <= 1) {
//         return 1
//     } 

//     return n * factorial(n - 1);
// }

// console.log(factorial(5));

// function collatz(n, count = 0) {

//     if (n == 1) {
//         return count
//     } else if (n % 2 == 0) {
//         return collatz(n / 2, ++count);
//     } else if (n % 2 != 0) {
//         return collatz(3 * n + 1, ++count);
//     }
// }

// console.log(collatz(27))

// function power(n, x) {
//     if (x == 0) {
//         return 1
//     }

//     return n * power(n, x - 1)
// }

// console.log(power(2, 1))

// function all(array, callback) {
//     let val = array.shift();
//     if (val != undefined) {
//         if (callback(val)) {
//             return all(array, callback);
//         } else {
//             return false;
//         }
//     } else {
//         return true;
//     }
// }

// console.log(all([1,2,4], (number) => {
//     return number < 4;
// }))

// function productOfArray(numbers) {
//     let val = numbers.shift();
//     if (val != undefined) {
//         return val * productOfArray(numbers);
//     } else {
//         return 1
//     }
// }

// console.log(productOfArray([1,2,3,10]))

// function contains(object, value) {
//     let objectChildren = Object.values(object);

//     if (objectChildren.length == 0) {
//         return false
//     } 

//     if (objectChildren.includes(value)) {
//         return true
//     } else {
//         return objectChildren.forEach((child) => {
//             return contains(child, value)
//         })
//     }
// }

// var nestedObject = {
//     data: {
//         info: {
//             stuff: {
//                 thing: {
//                     moreStuff: {
//                         magicNumber: 44,
//                         something: 'foo2'
//                     }
//                 }
//             }
//         }
//     }
// }

// let hasIt = contains(nestedObject, 44); // true
// let doesntHaveIt = contains(nestedObject, "foo"); // false

// Object.values()

function fibs(n) {
    let secondPrev = 0;
    let prev = 0;
    let current = 0;
    let output = [0];

    for(let i = 1; i < n; i++) {
        if (i == 1) {
            current = 1;
        } else {
            current = secondPrev + prev;
        }

        output.push(current);
        secondPrev = prev;
        prev = current;
    }

    return output;
}

console.log(fibs(8))

function fibsRecursive() {

}



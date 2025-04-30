function mergeSort(list) {
	if (list.length <= 1) {
		return list;
	}

	let sortedArray = [];

	const listMidPoint = Math.floor(list.length / 2);
	let firstHalf = mergeSort(list.slice(0, listMidPoint));
	let secondHalf = mergeSort(list.slice(listMidPoint, list.length));

    let i = 0;
    let j = 0;

    const totalLength = firstHalf.length + secondHalf.length;
    while (sortedArray.length < totalLength) {
        // For the scenario that one array has run out of elements, continue adding elements from the other array
        if (secondHalf[j] == undefined) {
            sortedArray.push(firstHalf[i]);
            i++;
            continue
        } else if (firstHalf[i] == undefined) {
            sortedArray.push(secondHalf[j]);
            j++;
            continue
        }
        
        if (secondHalf[j] < firstHalf[i]) {
            sortedArray.push(secondHalf[j]);
            j++;
        } else {
            sortedArray.push(firstHalf[i]);
            i++;
        }
    }

    return sortedArray;
}

console.log(mergeSort([105, 79, 100, 110]));

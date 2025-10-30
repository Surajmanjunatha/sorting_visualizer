const BubbleSort = (array, position, steps, colors, pseudoSteps) => {
    let colorKey = colors[colors.length - 1].slice();

    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            let swapped = false;
            if (array[j] > array[j + 1]) {
                array = swap(array, j, j + 1);
                swapped = true;
            }
            // record array state (after possible swap)
            steps.push(array.slice());
            // pseudocode: if swapped -> swap line (3), else compare line (2)
            if (pseudoSteps) pseudoSteps.push(swapped ? 3 : 2);

            // highlight compared indices
            colorKey[j] = 1;
            colorKey[j + 1] = 1;
            colors.push(colorKey.slice());
            // comparison pseudocode line
            if (pseudoSteps) pseudoSteps.push(2);

            colorKey[j] = 0;
            colorKey[j + 1] = 0;
        }
        colorKey[array.length - 1 - i] = 2;
        steps.push(array.slice());
        if (pseudoSteps) pseudoSteps.push(1); // mark sorted -> inner loop finished
        colors.push(colorKey.slice());
    }
    colors[colors.length - 1] = new Array(array.length).fill(2);
    // mark last pseudocode line as done
    if (pseudoSteps) pseudoSteps.push(1);
    return;
};

const swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    return arr;
}

export default BubbleSort;

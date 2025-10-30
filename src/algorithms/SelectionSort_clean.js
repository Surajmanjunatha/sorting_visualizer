export function getSelectionSortAnimations(array, events = []) {
    const animations = [];
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;

        for (let j = i + 1; j < n; j++) {
            // compare j and minIdx (color on)
            animations.push([j, minIdx]);
            if (events) events.push({ type: 'compare', indices: [j, minIdx], pseudo: 2 });
            // compare revert (color off)
            animations.push([j, minIdx]);
            if (events) events.push({ type: 'compare-revert', indices: [j, minIdx], pseudo: 2 });

            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }

        if (minIdx !== i) {
            // write/swaps for visualization: position i gets value at minIdx
            animations.push([i, array[minIdx]]);
            animations.push([minIdx, array[i]]);
            if (events) events.push({ type: 'swap', indices: [i, minIdx], pseudo: 3 });
            [array[minIdx], array[i]] = [array[i], array[minIdx]];
        }
    }

    return animations;
}

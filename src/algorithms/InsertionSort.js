export function getInsertionSortAnimations(array, events = []) {
    const animations = [];
    const n = array.length;

    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > key) {
            // compare j and j+1
            animations.push([j, j + 1]);
            if (events) events.push({ type: 'compare', indices: [j, j+1], pseudo: 3 });
            // revert
            animations.push([j, j + 1]);
            if (events) events.push({ type: 'compare-revert', indices: [j, j+1], pseudo: 3 });

            // write value to j+1
            animations.push([j + 1, array[j]]);
            if (events) events.push({ type: 'write', indices: [j+1], value: array[j], pseudo: 4 });
            array[j + 1] = array[j];
            j = j - 1;
        }

        // final compare (position found)
        animations.push([j + 1, i]);
        if (events) events.push({ type: 'compare', indices: [j+1, i], pseudo: 3 });
        animations.push([j + 1, i]);
        if (events) events.push({ type: 'compare-revert', indices: [j+1, i], pseudo: 3 });

        // place key at j+1
        animations.push([j + 1, key]);
        if (events) events.push({ type: 'write', indices: [j+1], value: key, pseudo: 6 });
        array[j + 1] = key;
    }

    return animations;
}
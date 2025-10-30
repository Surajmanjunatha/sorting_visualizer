export function getQuickSortAnimations(array, events = []) {
    const animations = [];
    quickSortHelper(array, 0, array.length - 1, animations, events);
    return animations;
}

function quickSortHelper(array, low, high, animations, events) {
    if (low < high) {
        const pi = partition(array, low, high, animations, events);
        quickSortHelper(array, low, pi - 1, animations, events);
        quickSortHelper(array, pi + 1, high, animations, events);
    }
}

function partition(array, low, high, animations, events) {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        // compare j and pivot (color on)
        animations.push([j, high]);
        if (events) events.push({ type: 'compare', indices: [j, high], pseudo: 2 });
        // compare revert (color off)
        animations.push([j, high]);
        if (events) events.push({ type: 'compare-revert', indices: [j, high], pseudo: 2 });

        if (array[j] < pivot) {
            i++;
            // swap array[i] and array[j]
            animations.push([i, array[j]]);
            animations.push([j, array[i]]);
            if (events) events.push({ type: 'swap', indices: [i, j], pseudo: 2 });
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // final pivot swap
    animations.push([i + 1, array[high]]);
    animations.push([high, array[i + 1]]);
    if (events) events.push({ type: 'swap', indices: [i + 1, high], pseudo: 2 });
    [array[i + 1], array[high]] = [array[high], array[i + 1]];

    return i + 1;
}

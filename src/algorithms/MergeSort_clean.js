export function getMergeSortAnimations(array, events = []) {
    const animations = [];
    if (array.length <= 1) return animations;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations, events);
    return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations, events) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations, events);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations, events);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations, events);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations, events) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;

    while (i <= middleIdx && j <= endIdx) {
        // compare i and j (color on)
        animations.push([i, j]);
        if (events) events.push({ type: 'compare', indices: [i, j], pseudo: 2 });
        // compare revert (color off)
        animations.push([i, j]);
        if (events) events.push({ type: 'compare-revert', indices: [i, j], pseudo: 2 });

        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push([k, auxiliaryArray[i]]);
            if (events) events.push({ type: 'write', indices: [k], value: auxiliaryArray[i], pseudo: 3 });
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            animations.push([k, auxiliaryArray[j]]);
            if (events) events.push({ type: 'write', indices: [k], value: auxiliaryArray[j], pseudo: 3 });
            mainArray[k++] = auxiliaryArray[j++];
        }
    }

    while (i <= middleIdx) {
        animations.push([i, i]);
        if (events) events.push({ type: 'compare', indices: [i, i], pseudo: 2 });
        animations.push([i, i]);
        if (events) events.push({ type: 'compare-revert', indices: [i, i], pseudo: 2 });
        animations.push([k, auxiliaryArray[i]]);
        if (events) events.push({ type: 'write', indices: [k], value: auxiliaryArray[i], pseudo: 3 });
        mainArray[k++] = auxiliaryArray[i++];
    }

    while (j <= endIdx) {
        animations.push([j, j]);
        if (events) events.push({ type: 'compare', indices: [j, j], pseudo: 2 });
        animations.push([j, j]);
        if (events) events.push({ type: 'compare-revert', indices: [j, j], pseudo: 2 });
        animations.push([k, auxiliaryArray[j]]);
        if (events) events.push({ type: 'write', indices: [k], value: auxiliaryArray[j], pseudo: 3 });
        mainArray[k++] = auxiliaryArray[j++];
    }
}

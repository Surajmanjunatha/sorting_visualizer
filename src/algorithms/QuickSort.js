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
export { getQuickSortAnimations } from './QuickSort_clean';
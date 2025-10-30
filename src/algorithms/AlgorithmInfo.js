export const algorithmInfo = {
    bubble: {
        name: "Bubble Sort",
        description: "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
        timeComplexity: {
            best: "O(n)",
            average: "O(n²)",
            worst: "O(n²)"
        },
        spaceComplexity: "O(1)",
        pseudocode: [
            "for i from 0 to n-1:",
            "  for j from 0 to n-i-2:",
            "    if arr[j] > arr[j+1]:",
            "      swap arr[j] and arr[j+1]"
        ]
    },
    merge: {
        name: "Merge Sort",
        description: "Divides the array into smaller subarrays, sorts them, and then merges them back together.",
        timeComplexity: {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n log n)"
        },
        spaceComplexity: "O(n)",
        pseudocode: [
            "function mergeSort(arr):",
            "  if length(arr) <= 1: return arr",
            "  mid = floor(len/2)",
            "  left = mergeSort(arr[0:mid])",
            "  right = mergeSort(arr[mid:])",
            "  return merge(left, right)"
        ]
    },
    quick: {
        name: "Quick Sort",
        description: "Selects a 'pivot' element and partitions the array around it, recursively sorting the sub-arrays.",
        timeComplexity: {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n²)"
        },
        spaceComplexity: "O(log n)",
        pseudocode: [
            "function quickSort(arr, low, high):",
            "  if low < high:",
            "    p = partition(arr, low, high)",
            "    quickSort(arr, low, p-1)",
            "    quickSort(arr, p+1, high)"
        ]
    },
    insertion: {
        name: "Insertion Sort",
        description: "Builds the final sorted array one item at a time, by repeatedly inserting a new element into the sorted portion of the array.",
        timeComplexity: {
            best: "O(n)",
            average: "O(n²)",
            worst: "O(n²)"
        },
        spaceComplexity: "O(1)",
        pseudocode: [
            "for i from 1 to n-1:",
            "  key = arr[i]",
            "  j = i-1",
            "  while j >= 0 and arr[j] > key:",
            "    arr[j+1] = arr[j]",
            "    j = j-1",
            "  arr[j+1] = key"
        ]
    },
    selection: {
        name: "Selection Sort",
        description: "Divides the array into a sorted and unsorted portion, repeatedly selecting the smallest element from the unsorted portion.",
        timeComplexity: {
            best: "O(n²)",
            average: "O(n²)",
            worst: "O(n²)"
        },
        spaceComplexity: "O(1)",
        pseudocode: [
            "for i from 0 to n-2:",
            "  minIdx = i",
            "  for j from i+1 to n-1:",
            "    if arr[j] < arr[minIdx]: minIdx = j",
            "  swap arr[i] and arr[minIdx]"
        ]
    }
};
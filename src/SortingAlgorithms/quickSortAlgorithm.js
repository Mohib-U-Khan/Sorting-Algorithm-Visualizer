export function getQuickSortAnimations(array) {
    if (array.length <= 1) return array;
    const animations = [];
    let helperArray = array.slice();
    quickSorter(helperArray, 0, helperArray.length - 1, animations);
    array = helperArray;
    return animations;
  }

function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function partition(array, low, high, animations) {
    let pivot = getRandomNumber(low, high);
    
    animations.push(["comparison1", pivot, high]);
    animations.push(["swap", pivot, array[high]]);
    animations.push(["swap", high, array[pivot]]);
    animations.push(["comparison2", pivot, high]);
    swap(array, pivot, high);

    let lti = low;

    for (let i = low; i < high; ++i) {
        animations.push(["comparison1", i, high]);
        animations.push(["comparison2", i, high]);
        if (array[i] <= array[high]) {
        animations.push(["comparison1", i, lti]);
        animations.push(["swap", i, array[lti]]);
        animations.push(["swap", lti, array[i]]);
        animations.push(["comparison2", i, lti]);
        swap(array, i, lti);
        lti++;
        }
    }
    animations.push(["comparison1", lti, high]);
    animations.push(["swap", high, array[lti]]);
    animations.push(["swap", lti, array[high]]);
    animations.push(["comparison2", lti, high]);

    swap(array, lti, high);
    return lti;
}

function quickSorter(array, low, high, animations) {
    if (low < high) {
        let pi = partition(array, low, high, animations);
        quickSorter(array, low, pi - 1, animations);
        quickSorter(array, pi + 1, high, animations);
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
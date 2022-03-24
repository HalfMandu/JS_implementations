/* 
* 	Count Inversions - JS Implementation - nlogn 
* 	(Compute the total number of inversions in an Array)
*/

const { performance } = require('perf_hooks');

//recursive call -- takes left and right subarrays, sorts and counts inversions 
function merge(left, right) {

    let i = 0;
    let j = 0;
    let out = [];
    let inversionCount = left.inversionCount + right.inversionCount;

    //copy left and right to output, counting inversions along the way
    //the num of remaining elements in left after right is done is the number of inversions
    while (i < left.arr.length && j < right.arr.length) {

        //sort sub arrays
        if (left.arr[i] > right.arr[j]) {
            //inversion detected
            out.push(right.arr[j]);
            j++;
            //only count as inversion where right skips left...
            inversionCount += left.arr.length - i;
        } else {
            //no inversion detected
            out.push(left.arr[i]);
            i++;
        }
    }

    //concat remaining output arrays, which by here are already sorted
    out = [...out, ...left.arr.slice(i), ...right.arr.slice(j)];

    //returns output array, along with its count of inversions
    return { arr: out, inversionCount };
}

//outer level function which splits then invokes recursive calls
function mergeSort(obj) {

    //base case halts the recursion (finally)
    if (obj.arr.length === 1) {
        return obj;
    }

    //keep chopping in half in recursion until can't anymore
    let mid = Math.floor(obj.arr.length / 2);

	//give each side its own oject, to track its array as well as inversion counter
    let left = { arr: obj.arr.slice(0, mid), inversionCount: obj.inversionCount };
    let right = { arr: obj.arr.slice(mid), inversionCount: obj.inversionCount };

    //send the left and right subarrays over to their grand finale
    let result = merge(mergeSort(left), mergeSort(right));

    return result;
}


const arr = [9, 1, 3, 12];
console.log("Begining Array: " + arr);

let startTime = performance.now();
let resultObj = mergeSort({ arr: arr, inversionCount: 0 });
let endTime = performance.now();

console.log("Final Inversion Count: " + resultObj.inversionCount);
console.log("Final Sorted Array: " + resultObj.arr);

console.log(`mergeSort() took ${endTime - startTime} milliseconds`);













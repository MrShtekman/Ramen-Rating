let number = 5;
let numbers = [1,2,3,4,5,6,7,8,9,10];
let words = ['Joh', 'cringe', 'haHAA']

const filterFunc = (array, filter) => {
    return array.filter(filter);
}
const wordFilter = (value) => {
    return value.length > 3;
}
const numberFilter = (value) => {
    return value % 2 == 1;
}

const mapFunc = (array, map) => {
    return array.map(map);
}
const wordMap = (value) => {
    return value.concat('dog');
}
const numberMap = (value) => {
    return value * 3;
}

const reduceFunc = (array, reducer, initialValue) => {
    const ini = initialValue == undefined ? 0 : initialValue;
    return array.reduce(reducer, ini)
}
const numberReducer = (accumulator, currentValue) => {
    return accumulator * currentValue;
}

// console.log(filterFunc(words, wordFilter));
// console.log(filterFunc(numbers, numberFilter));
// console.log(mapFunc(numbers, numberMap));
// console.log(mapFunc(words, wordMap));
// console.log(Array.isArray(numbers));
console.log(reduceFunc(numbers, numberReducer, 1));


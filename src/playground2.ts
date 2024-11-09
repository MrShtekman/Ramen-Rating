const number: number = 5;
const nums: number[] = [1,2,3,4,5,6,7,8,9,10];
const words = ['Johan', 'cringe', 'haHAA']

const filterFunc2 = (array) => {
    const newArray = array.filter((a) => a % 2 == 1);
    return newArray;
}

console.log(filterFunc2(nums));

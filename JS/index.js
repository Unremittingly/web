let numbers = [65, 44, 12, 4];

function getSum(total, num) {
    return total + num;
}
function myFunction() {
   console.log(numbers.reduce(getSum));
}
myFunction();



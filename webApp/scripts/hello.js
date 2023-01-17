
function sum(a, b)
{
   return a**b; 
}
sum(3,4)
console.log(sum(3,4))


const num =[2,4,7,10,-10];
num.sort(comp);
function comp(a, b){
    return b-a;
}
console.log(num);

console.log(num.map(num=> num *=3));
nums = num.map(function(num){
    return num *=2;
});
console.log(nums)


let x =30;
let y="200";
console.log(x+y);

function myFun(){
    let a =10;
    if(true){
        let a =5;
        console.log(a);
    }
    console.log(a);
}
myFun();

const square =num => num*num;
console.log(square(3)+5);

arr = [0, 3, 7, 8];
//console.log(nums.indexOf(0));
console.log(nums.indexOf(1));

const letters = ["a", "b", "c"];
console.log(letters.splice(1, 0, 'd'));


const nun = [30, 35, 42, 20, 15];
console.log(nun.every(num =>num>20));

const mum =  [10, 20, 8, 17];
mum.filter(e=>e>20);
console.log(mum)
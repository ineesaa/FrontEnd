const sum = (a, b, c) => a + b + c;
function curry(fn) {
    function curried(...args) {
        if(args.length >= fn.length){
            return fn(...args)
        }
        else{
            return function(...nextArgs){
                return curried(...args, ...nextArgs)
            }
        }
    }
    return curried

}

const fn = curry(sum);
console.log(fn(1)(2)(3));   
console.log(fn(1,2)(3));    
console.log(fn(1,2,3));     
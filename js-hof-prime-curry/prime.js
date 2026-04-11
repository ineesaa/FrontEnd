function createIsPrime(){
    const memo = new Map();
    return function(x){
        if(memo.has(x)) return memo.get(x);
        if(x < 2) {
            memo.set(x, false);
            return false;
        }
        let result = true;
        for(let i = 2; i <= Math.sqrt(x); i++){
            if(x % i === 0){
                result = false;
                break;
            }
        }
        memo.set(x, result);
        return result;
    }
}
const isPrime = createIsPrime();
console.log(isPrime(7));  
console.log(isPrime(7));
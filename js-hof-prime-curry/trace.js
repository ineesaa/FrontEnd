const sum = (a, b) => a + b;
function trace(fn){
    const history = [];

    function wrap(...args){
        const result = fn(...args);
        history.push({
            inp: args,
            out: result,
        });
        return result;
    }
    wrap.history = history;
    return wrap;
}
const fn = trace(sum);
fn(2,4);
fn(3,3);
console.log(fn.history);
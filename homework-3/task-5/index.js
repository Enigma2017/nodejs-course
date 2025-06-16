function lazyMap( array, mapFn ) {
  let index = 0;

  return {
    next: function () {
      if ( index < array.length ) {
        const value = mapFn( array[ index ] );
        index++;
        return { value, done: false };
      } else {
        return { done: true };
      }
    }
  };
}

function fibonacciGenerator() {
  let a = 0, b = 1;

  return {
    next: function () {
      const value = a;
      [ a, b ] = [ b, a + b ];
      return { value, done: false };
    }
  };
}

const lazy = lazyMap( [ 1, 2, 3 ], x => x * 2 );

console.log( lazy.next() );
console.log( lazy.next() );
console.log( lazy.next() );
console.log( lazy.next() );

const fib = fibonacciGenerator();

console.log( fib.next() );
console.log( fib.next() ); 
console.log( fib.next() );
console.log( fib.next() ); 
console.log( fib.next() );
function createCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

function repeatFunction( fn, times ) {
  return function () {
    if ( typeof fn !== "function" ) {
      throw new Error( "First argument must be a function" );
    }

    if ( times > 0 ) {
      for ( let i = 0; i < times; i++ ) {
        fn();
      }
    } else if ( times < 0 ) {
      const interval = setInterval( fn, 1000 );
      return () => clearInterval( interval );
    }
  };
}

const counterA = createCounter();
console.log( "Counter A:", counterA() );
console.log( "Counter A:", counterA() );

const counterB = createCounter();
console.log( "Counter B:", counterB() );
console.log( "Counter A:", counterA() );

const sayHello = () => console.log( "Hello!" );

const run3Times = repeatFunction( sayHello, 3 );
run3Times();

const runForever = repeatFunction( () => console.log( "Hello!" ), -1 );
const stop = runForever();

setTimeout( () => {
  stop();
  console.log( "Stopped infinite repetition." );
}, 5000 );

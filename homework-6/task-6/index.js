const _ = Symbol('placeholder');

function curry( func, arity = func.length ) {
  function mergeArgs( oldArgs, newArgs ) {
    const merged = [];
    let newIndex = 0;

    for ( let i = 0; i < oldArgs.length; i++ ) {
      if ( oldArgs[i] === _ ) {
        if ( newIndex < newArgs.length ) {
          merged.push( newArgs[ newIndex++ ] );
        } else {
          merged.push( _ );
        }
      } else {
        merged.push( oldArgs[i] );
      }
    }

    while ( newIndex < newArgs.length ) {
      merged.push( newArgs[ newIndex++ ] );
    }

    return merged;
  }

  function curried( ...args ) {
    const complete = args.filter( arg => arg !== _ ).length >= arity;

    if ( complete ) {
      return func( ...args );
    }

    return function ( ...nextArgs ) {
      const merged = mergeArgs( args, nextArgs );
      return curried( ...merged );
    };
  }

  return curried;
}

function multiply( a, b, c ) {
  return a * b * c;
}

const curriedMultiply = curry( multiply, 3 );

const result = curriedMultiply( _, 3 )(2)(4);
console.log( "Result with placeholder:", result );

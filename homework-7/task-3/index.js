function chainPromises(functions) {
  if ( !Array.isArray(functions) ) {
    return Promise.reject( new TypeError( "Argument must be an array of functions" ) );
  }

  return functions.reduce( ( prevPromise, currentFn, index ) => {
    if ( typeof currentFn !== 'function' ) {
      return Promise.reject( new TypeError( `Element at index ${index} is not a function` ) );
    }

    return prevPromise.then(currentFn);
  }, Promise.resolve() );
}

function asyncFunction1() {
  return Promise.resolve( "Result from asyncFunction1" );
}

function asyncFunction2(data) {
  return Promise.resolve( data + " - Result from asyncFunction2" );
}

function asyncFunction3(data) {
  return Promise.resolve( data + " - Result from asyncFunction3" );
}

const functionsArray = [ asyncFunction1, asyncFunction2, asyncFunction3 ];

chainPromises(functionsArray)
  .then( result => {
    console.log( "Chained promise result:", result );
  } )
  .catch(error => {
    console.error( "Chained promise error:", error );
  } );

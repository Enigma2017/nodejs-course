function promisify(callbackBasedFn) {
  return function ( ...args ) {
    return new Promise( ( resolve, reject ) => {
      callbackBasedFn( ...args, ( err, result ) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      } );
    } );
  };
}

function callbackStyleFunction( value, callback ) {
  setTimeout( () => {
    if ( value > 0 ) {
      callback( null, value * 2 );
    } else {
      callback( "Invalid value", null );
    }
  }, 1000 );
}

const promisedFunction = promisify( callbackStyleFunction );

promisedFunction(3)
  .then( result => {
    console.log( "Promised function result:", result );
  } )
  .catch(error => {
    console.error( "Promised function error:", error );
  } );

promisedFunction(-1)
  .then( result => {
    console.log( "Result:", result );
  } )
  .catch(error => {
    console.error( "Error:", error );
  } );

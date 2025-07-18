function promiseAll(promises) {
  return new Promise( ( resolve, reject ) => {
    if ( !Array.isArray(promises) ) {
      return reject( new TypeError( "Argument must be an array" ) );
    }

    const results = [];
    let resolvedCount = 0;

    if ( promises.length === 0 ) {
      return resolve( [] );
    }

    promises.forEach( ( p, index ) => {
      Promise.resolve(p)
        .then( value => {
          results[index] = value;
          resolvedCount++;
          if ( resolvedCount === promises.length ) {
            resolve(results);
          }
        } )
        .catch( err => {
          reject(err);
        } );
    } );
  } );
}

const promises1 = [
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
];

promiseAll(promises1)
  .then( results => {
    console.log( "All promises resolved:", results );
  } )
  .catch( error => {
    console.error( "Rejected:", error );
  } );

const promises2 = [
  Promise.resolve( "OK" ),
  Promise.reject( "Error occurred" ),
  Promise.resolve( "Will not be reached" )
];

promiseAll(promises2)
  .then( results => {
    console.log( "All resolved:", results );
  } )
  .catch( error => {
    console.error( "At least one promise rejected:", error );
  } );

promiseAll([])
  .then( results => {
    console.log( "Empty array result:", results );
  } );

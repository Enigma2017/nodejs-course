function promiseAllSettled(promises) {
  return new Promise( ( resolve, reject ) => {
    if ( !Array.isArray(promises) ) {
      return reject( new TypeError( "Argument must be an array" ) );
    }

    const results = [];
    let settledCount = 0;

    if ( promises.length === 0 ) {
      return resolve([]);
    }

    promises.forEach( ( p, index ) => {
      Promise.resolve(p)
        .then( value => {
          results[index] = { status: "fulfilled", value };
        } )
        .catch( reason => {
          results[index] = { status: "rejected", reason };
        } )
        .finally( () => {
          settledCount++;
          if ( settledCount === promises.length ) {
            resolve(results);
          }
        } );
    } );
  } );
}

const promises = [
  Promise.resolve(1),
  Promise.reject( "Error occurred" ),
  Promise.resolve(3)
];

promiseAllSettled(promises)
  .then( results => {
    console.log( "All promises settled:", results );
  } );

promiseAllSettled( [] )
  .then( results => {
    console.log( "Empty input:", results );
  } );

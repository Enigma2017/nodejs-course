function customShuffle(array) {
  if ( !Array.isArray(array) ) {
    throw new Error( 'Argument must be an array' );
  }

  const result = array.slice();
  for ( let i = result.length - 1; i > 0; i-- ) {
    const j = Math.floor( Math.random() * ( i + 1 ) );
    [ result[i], result[j] ] = [ result[j], result[i] ];
  }

  return result;
}

const original = [ 1, 2, 3, 4, 5 ];

console.log( 'original array:' );
console.log( original );

const shuffled1 = customShuffle( original );
console.log( 'The shuffled array 1:' );
console.log(shuffled1);

const shuffled2 = customShuffle( original );
console.log( 'The shuffled array 2:' );
console.log(shuffled2);

console.log( 'The original array has not been changed:' );
console.log(original);

try {
  customShuffle( 'not an array' );
} catch (e) {
  console.error( 'An Error:', e.message );
}

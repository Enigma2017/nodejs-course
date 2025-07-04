function chunkArray( array, chunkSize ) {
  if ( !Array.isArray(array) ) {
    throw new Error( 'First argument must be an array' );
  }

  if ( typeof chunkSize !== 'number' || chunkSize <= 0 ) {
    throw new Error( 'Chunk size must be a positive number' );
  }

  const result = [];
  const len = array.length;

  for ( let i = 0; i < len; i += chunkSize ) {
    result.push( array.slice( i, i + chunkSize ) );
  }

  return result;
}

const numbers = [ 1, 2, 3, 4, 5, 6, 7 ];
const chunks1 = chunkArray( numbers, 3 );
console.log( 'The chunks of numbers by 3:', chunks1 );

const letters = [ 'a', 'b', 'c', 'd', 'e' ];
const chunks2 = chunkArray( letters, 2 );
console.log( 'The chunks of letters by 2:', chunks2 );

const small = [42];
const chunks3 = chunkArray( small, 5 );
console.log( 'The chunks of small by 5:', chunks3 );

try {
  chunkArray( 'not-an-array', 2 );
} catch (e) {
  console.error( 'An Error:', e.message );
}

try {
  chunkArray( [ 1, 2, 3 ], 0 );
} catch (e) {
  console.error( 'An Error:', e.message );
}

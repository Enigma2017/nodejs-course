function calculateFactorial( n, acc = 1 ) {
  if ( n < 0 ) throw new Error( "Factorial is not defined for negative numbers" );
  if ( n === 0 || n === 1 ) return acc;
  return calculateFactorial( n - 1, acc * n );
}

function power( base, exponent, acc = 1 ) {
  if ( exponent < 0 ) throw new Error( "Exponent must be non-negative" );
  if ( exponent === 0 ) return acc;
  return power( base, exponent - 1, acc * base );
}

console.log( calculateFactorial(5) );
console.log( calculateFactorial(0) );
console.log( calculateFactorial(10) );
console.log( power(3, 4) );
console.log( power(2, 0) );  
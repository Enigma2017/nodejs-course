function measureArrayPerformance( fn, array ) {
  const t0 = performance.now();
  const result = fn(array);
  const t1 = performance.now();

  return {
    result,
    time: t1 - t0
  };
}


const builtInMap = arr => arr.map( x => x * 2 );

const customMap = arr => {
  const result = [];
  for ( let i = 0; i < arr.length; i++ ) {
    result.push( arr[i] * 2 );
  }
  return result;
};

const builtInFilter = arr => arr.filter( x => x % 2 === 0 );

const customFilter = arr => {
  const result = [];
  for ( let i = 0; i < arr.length; i++ ) {
    if ( arr[i] % 2 === 0 ) {
      result.push( arr[i] );
    }
  }
  return result;
};

const builtInReduce = arr => arr.reduce( ( sum, x ) => sum + x, 0 );

const customReduce = arr => {
  let sum = 0;
  for ( let i = 0; i < arr.length; i++ ) {
    sum += arr[i];
  }
  return sum;
};

const bigArray = Array.from( { length: 1_000_000 }, (_, i) => i );

console.log( '=== MAP ===' );
console.log( 'Built-in map:', measureArrayPerformance( builtInMap, bigArray ) );
console.log( 'Custom map:', measureArrayPerformance( customMap, bigArray ) );

console.log( '\n=== FILTER ===' );
console.log( 'Built-in filter:', measureArrayPerformance( builtInFilter, bigArray ) );
console.log( 'Custom filter:', measureArrayPerformance( customFilter, bigArray ) );

console.log( '\n=== REDUCE ===' );
console.log( 'Built-in reduce:', measureArrayPerformance( builtInReduce, bigArray ) );
console.log( 'Custom reduce:', measureArrayPerformance( customReduce, bigArray ) );

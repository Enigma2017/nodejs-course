function getArrayIntersection( arr1, arr2 ) {
  const set2 = new Set(arr2);
  return [ ...new Set( arr1.filter( item => set2.has(item) ) ) ];
}

function getArrayUnion( arr1, arr2 ) {
  return [ ...new Set( [ ...arr1, ...arr2 ] ) ];
}

const a = [ 1, 2, 3, 4 ];
const b = [ 3, 4, 5, 6 ];

const intersection = getArrayIntersection(a, b);
console.log( 'The crossing arrays:' );
console.log(intersection);

const union = getArrayUnion(a, b);
console.log( 'The union of arrays:' );
console.log(union);

const c = [ 1, 1, 2, 2, 3 ];
const d = [ 2, 3, 3, 4 ];
console.log( 'The crossing c and d:', getArrayIntersection(c, d) );
console.log( 'The union c and d:', getArrayUnion(c, d) );

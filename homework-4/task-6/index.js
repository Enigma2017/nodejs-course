function deepCloneObject( obj, hash = new WeakMap() ) {
  if ( obj === null || typeof obj !== 'object' ) return obj;

  if ( hash.has(obj) ) return hash.get(obj);

  if ( Array.isArray(obj) ) {
    const arrCopy = [];
    hash.set( obj, arrCopy );

    obj.forEach( ( item, index ) => {
      arrCopy[index] = deepCloneObject( item, hash );
    } );
    return arrCopy;
  }

  if ( obj instanceof Date ) return new Date(obj);
  if ( obj instanceof RegExp ) return new RegExp( obj.source, obj.flags );
  if ( obj instanceof Map ) {
    const mapCopy = new Map();
    hash.set( obj, mapCopy );

    obj.forEach( ( value, key ) => {
      mapCopy.set( key, deepCloneObject( value, hash ) );
    } );

    return mapCopy;
  }

  if ( obj instanceof Set ) {
    const setCopy = new Set();
    hash.set( obj, setCopy );

    obj.forEach( value => {
      setCopy.add( deepCloneObject( value, hash ) );
    } );

    return setCopy;
  }

  const objCopy = Object.create( Object.getPrototypeOf(obj) );
  hash.set( obj, objCopy );

  for ( const key of Reflect.ownKeys(obj) ) {
    const desc = Object.getOwnPropertyDescriptor( obj, key );

    if ( desc.get || desc.set ) {
      Object.defineProperty( objCopy, key, desc );
    } else {
      objCopy[key] = deepCloneObject( obj[key], hash );
    }
  }
  return objCopy;
}

const a = { name: 'obj' };
a.self = a;
a.nested = { arr: [ 1, 2, { foo: 'bar' } ], date: new Date(), reg: /test/gi };
a.map = new Map( [ [ 'key', 'value' ] ] );
a.set = new Set( [ 1, 2, 3 ] );

const cloned = deepCloneObject(a);

console.log( cloned );
console.log( cloned.self === cloned );
console.log( cloned.nested.arr[2] !== a.nested.arr[2] );
console.log( cloned.map instanceof Map );
console.log( cloned.set instanceof Set );

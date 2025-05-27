// addition operation
String.prototype.plus = function( b ) {
  let a = this.replace( /^0+/, '' ) || '0';
  b = b.replace( /^0+/, '' ) || '0';

  let res = [];
  let carry = 0;

  while ( a.length < b.length ) a = '0' + a;
  while ( b.length < a.length ) b = '0' + b;

  for ( let i = a.length - 1; i >= 0; i-- ) {
    const sum = parseInt( a[i] ) + parseInt( b[i] ) + carry;
    res.push( sum % 10 );
    carry = Math.floor( sum / 10 );
  }

  if ( carry > 0 ) res.push( carry );

  return res.reverse().join('');
};

function isLess(  a, b ) {
  a = a.replace( /^0+/, '' ) || '0';
  b = b.replace( /^0+/, '' ) || '0';

  if ( a.length !== b.length ) return a.length < b.length;
  return a < b;
}

// subtraction operation  
String.prototype.minus = function( b ) {
  let a = this.replace( /^0+/, '' ) || '0';
  b = b.replace( /^0+/, '' ) || '0';

  if ( isLess( a, b ) ) return '0';

  let res = [];
  let borrow = 0;

  while ( a.length < b.length ) a = '0' + a;
  while ( b.length < a.length ) b = '0' + b;

  for ( let i = a.length - 1; i >= 0; i-- ) {
    let digitA = parseInt( a[i] ) - borrow;
    let digitB = parseInt( b[i] );

    if ( digitA < digitB ) {
      digitA += 10;
      borrow = 1;
    } else {
      borrow = 0;
    }

    res.push( digitA - digitB );
  }

  while ( res.length > 1 && res[res.length - 1] === 0 ) {
    res.pop();
  }

  return res.reverse().join('');
};

// multiplication operation
String.prototype.multiply = function( b ) {
  let a = this.replace( /^0+/, '' ) || '0';
  b = b.replace( /^0+/, '' ) || '0';

  if ( a === '0' || b === '0' ) return '0';

  const result = Array( a.length + b.length ).fill( 0 );

  for ( let i = a.length - 1; i >= 0; i-- ) {
    for ( let j = b.length - 1; j >= 0; j-- ) {
      const mul = parseInt( a[i] ) * parseInt( b[j] );
      const p1 = i + j;
      const p2 = i + j + 1;

      const sum = mul + result[p2];

      result[p2] = sum % 10;
      result[p1] += Math.floor( sum / 10 );
    }
  }

  while ( result[0] === 0 ) result.shift();

  return result.join('');
};

// division operation
String.prototype.divide = function( b ) {
  let a = this.replace( /^0+/, '' ) || '0';
  b = b.replace( /^0+/, '' ) || '0';

  if ( b === '0' ) throw new Error( 'The divisor cannot be zero.' );
  if ( isLess( a, b ) ) return '0';

  let result = '';
  let current = '';

  for ( let i = 0; i < a.length; i++ ) {
    current += a[i];
    let count = 0;

    while ( !isLess( current, b ) ) {
      current = current.minus( b );
      count++;
    }

    result += count.toString();
  }

  return result.replace( /^0+/, '' ) || '0';
};
  
console.log( '123'.plus( '456' ) );
console.log( '999'.plus( '1' ) );
console.log( '00000123'.plus( '0000045' ) );
console.log( '0'.plus( '0' ) ); 
console.log( '000'.plus( '000' ) );
console.log( '5678'.minus( '1234' ) );
console.log( '1000'.minus( '999' ) ); 
console.log( '99'.multiply( '99' ) );     
console.log( '123456'.divide( '123' ) );  
console.log( '1000'.divide( '1000' ) );   
console.log( '1000'.divide( '1001' ) );   
console.log( '4444444444444444444444444'.divide( '4444444444444444444444444' ) ); 

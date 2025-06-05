function addValues( num1, num2 ) {
  if ( typeof num1 === 'number' && typeof num2 === 'number' ) {
    return num1 + num2;
  } else if ( typeof num1 === 'string' || typeof num2 === 'string' ) {
    return String( num1 ) + String( num2 );
  } else if ( Array.isArray( num1 ) && Array.isArray( num2 ) ) {
    return num1.toString() + num2.toString();
  } else {
    throw new Error( 'Unsupported types for addition' );
  }
}

function stringifyValue( value ) {
  if ( typeof value === 'object' && value !== null ) {
    return JSON.stringify( value );
  } else {
    return String( value );
  }
}

function invertBoolean( value ) {
  if ( typeof value !== 'boolean' ) {
    throw new Error( 'Value must be a boolean' );
  }
  return !value;
}

function convertToNumber( value ) {
  if ( typeof value === 'string' ) {
    const parsed = parseFloat(value);
    return isNaN( parsed ) ? null : parsed;
  }
  const num = Number( value );
  return isNaN( num ) ? null : num;
}

function coerceToType( value, type ) {
  switch ( type ) {
    case 'string':
      return stringifyValue( value );
    case 'number':
      return convertToNumber( value );
    case 'boolean':
      return Boolean( value );
      //return invertBoolean(value);
    case 'object':
      if ( typeof value === 'object' ) return value;
      throw new Error( 'Cannot converce to object' );
    default:
      throw new Error( 'Unsupported type' );
  }
}

window.dataUtils = {
  addValues,
  stringifyValue,
  invertBoolean,
  convertToNumber,
  coerceToType,
};
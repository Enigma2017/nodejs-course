const product = {
  name: "Laptop",
};

Object.defineProperties( product, {
  price: {
    value: 1000,
    writable: false,
    enumerable: false,
    configurable: true,
  },
  quantity: {
    value: 5,
    writable: false,
    enumerable: false,
    configurable: true,
  },
} );

function getTotalPrice(obj) {
  const priceDesc = Object.getOwnPropertyDescriptor( obj, "price" );
  const quantityDesc = Object.getOwnPropertyDescriptor( obj, "quantity" );

  if ( !priceDesc || !quantityDesc ) {
    throw new Error( "Not enough data for calculation." );
  }

  return priceDesc.value * quantityDesc.value;
}

function deleteNonConfigurable( obj, propName ) {
  const desc = Object.getOwnPropertyDescriptor( obj, propName );

  if ( !desc ) {
    console.warn( `The property is not found: "${propName}" in the object.` );
    return;
  }

  if ( desc.configurable ) {
    delete obj[propName];
    console.log( `The property "${propName}" successfully deleted.` );
  } else {
    throw new Error( `The property "${propName}" cannot be deleted (non-configurable).` );
  }
}

console.log( "The object product:" );
console.log(product);

console.log( "\n The list of visible keys:" );
console.log( Object.keys(product) );

console.log( "\n The full price:" );
console.log( getTotalPrice(product) );

console.log( "\n The attempt to delete price:" );
deleteNonConfigurable( product, "price" );

console.log( "\n The checking after deleting:" );
console.log( Object.getOwnPropertyDescriptor(product, "price") );

console.log( "\n The attempt to delete name (not configurable by default):" );

try {
  deleteNonConfigurable( product, "name" );
} catch (err) {
  console.error( err.message );
}

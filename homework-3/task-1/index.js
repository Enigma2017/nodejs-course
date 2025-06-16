function calculateDiscountedPrice( products, discount ) {
  return products.map( product => {
    return {
      ...product,
      price: +( product.price * ( 1 - discount / 100 ) ).toFixed(2)
    };
  });
}

function calculateTotalPrice( products ) {
  return products.reduce( ( sum, product ) => sum + product.price, 0 );
}

const products = [
  { name: 'Bag', price: 321 },
  { name: 'Vallet', price: 120 }
];

const discounted = calculateDiscountedPrice(products, 25);
console.log(discounted); 

console.log(products); 

const totalPrice = calculateTotalPrice(products);
console.log(totalPrice);
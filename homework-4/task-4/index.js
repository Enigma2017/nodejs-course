function createImmutableObject(obj) {
  if ( typeof obj !== "object" || obj === null ) return obj;

  const clone = Array.isArray(obj) ? [] : {};

  for ( const key of Object.keys(obj) ) {
    const value = obj[key];
    const immutableValue = createImmutableObject(value);

    Object.defineProperty( clone, key, {
      value: immutableValue,
      writable: false,
      enumerable: true,
      configurable: false,
    } );
  }

  return clone;
}

const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  email: "john.doe@example.com",
  address: {
    city: "New York",
    zip: "10001",
  },
  hobbies: ["reading", "traveling"],
};

const immutablePerson = createImmutableObject(person);

console.log( "Before attempt to change:", immutablePerson );

try {
  immutablePerson.firstName = "Jane"; 
  immutablePerson.address.city = "Chicago";
  immutablePerson.hobbies.push( "cooking" );
} catch (err) {
  console.error( "An Error by attempt to change:", err.message );
}

console.log( "\n After attempt to change:" );
console.log(immutablePerson);

console.log( "\n The descriptor of the age property:" );
console.log( Object.getOwnPropertyDescriptor( immutablePerson, "age" ) );

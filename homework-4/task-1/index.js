const _store = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  email: "john.doe@example.com",
  address: {},
};

const person = {};

Object.defineProperties( person, {
  firstName: {
    get: () => _store.firstName,
    enumerable: true,
    configurable: false,
  },
  lastName: {
    get: () => _store.lastName,
    enumerable: true,
    configurable: false,
  },
  age: {
    get: () => _store.age,
    enumerable: true,
    configurable: false,
  },
  email: {
    get: () => _store.email,
    enumerable: true,
    configurable: false,
  },
  address: {
    get: () => _store.address,
    enumerable: false,
    configurable: false,
  },
} );

person.updateInfo = function (info) {
  for ( const key in info ) {
    if ( _store.hasOwnProperty(key) ) {
      _store[key] = info[key];
    }
  }
};

console.log( "Before update:", person );

person.firstName = "Jane";
console.log( "After trying to change firstName directly:", person.firstName );

person.updateInfo( { firstName: "Jane", age: 31 } );
console.log( "After updateInfo:", person.firstName, person.age ); 

console.log( "Object keys:", Object.keys(person) );
console.log( "Address:", person.address );
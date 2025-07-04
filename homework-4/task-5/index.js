function observeObject( target, callback ) {
  if ( typeof target !== "object" || target === null ) return target;

  return new Proxy( target, {
    get( obj, prop, receiver ) {
      if ( typeof prop === "string" ) {
        callback( prop, "get" );
      }
      return Reflect.get( obj, prop, receiver );
    },
    set( obj, prop, value, receiver ) {
      if ( typeof prop === "string" ) {
        callback( prop, "set", value );
      }
      return Reflect.set( obj, prop, value, receiver );
    }
  } );
}

const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  email: "john.doe@example.com"
};

function logAction( prop, action, value ) {
  if ( action === "get" ) {
    console.log( `GET → property "${prop}" accessed` );
  } else if (action === "set") {
    console.log( `SET → property "${prop}" set to "${value}"` );
  }
}

const observedPerson = observeObject( person, logAction );

console.log( "Name:", observedPerson.firstName );
observedPerson.age = 35;                      
console.log( "Age:", observedPerson.age );
observedPerson.email = "new@example.com";

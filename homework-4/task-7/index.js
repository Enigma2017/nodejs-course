function validateObject( obj, schema ) {
  for ( const key in schema ) {
    const rules = schema[key];
    const value = obj[key];
    const valueType = Array.isArray(value) ? 'array' : typeof value;

    if ( rules.required && !( key in obj ) ) {
      return false;
    }

    if ( !rules.required && !( key in obj ) ) {
      continue;
    }

    if ( rules.type && valueType !== rules.type ) {
      return false;
    }

    if ( rules.type === 'string' ) {
      if ( rules.minLength && value.length < rules.minLength ) return false;
      if ( rules.maxLength && value.length > rules.maxLength ) return false;
      if ( rules.pattern && !rules.pattern.test(value) ) return false;
    }

    if ( rules.type === 'number' ) {
      if ( typeof rules.min === 'number' && value < rules.min ) return false;
      if ( typeof rules.max === 'number' && value > rules.max ) return false;
    }

    if ( rules.validate && typeof rules.validate === 'function' ) {
      if ( !rules.validate(value) ) return false;
    }
  }

  return true;
}

const schema = {
  name: { type: 'string', required: true, minLength: 2 },
  age: { type: 'number', required: true, min: 0, max: 120 },
  email: { 
    type: 'string', 
    required: false, 
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
  },
  preferences: {
    type: 'object',
    required: false,
    validate: (val) => typeof val === 'object' && val !== null && 'theme' in val
  }
};

const obj1 = {
  name: 'Kateryna',
  age: 38,
  email: 'kateryna@example.com',
  preferences: { theme: 'dark' }
};

const obj2 = {
  name: 'K',
  age: 130,
  email: 'invalid-email'
};

console.log( validateObject( obj1, schema ) );
console.log( validateObject(obj2, schema ) );

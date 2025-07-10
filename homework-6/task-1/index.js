const translations = {
  en: {
    greet: "Hello",
    intro: "Welcome to our website"
  },
  fr: {
    greet: "Bonjour",
    intro: "Bienvenue sur notre site web"
  }
};

const language = "fr";

function localize( strings, ...keys ) {
  return keys.map( key => {
    const value = translations[ language ][ key ];
    if ( !value ) {
      console.warn( `Translation not found for key "${ key }"` );
      return key;
    }
    return value;
  } ).join('');
}

const greeting = "greet";
const introduction = "intro";

const localizedGreeting = localize`${ greeting }`;
const localizedIntroduction = localize`${ introduction }`;

console.log( localizedGreeting );
console.log( localizedIntroduction );

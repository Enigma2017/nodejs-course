function multiline( strings, ...values ) {
  let fullText = strings.reduce( ( acc, str, i ) => acc + str + ( values[i] ?? '' ), '' );

  return fullText
    .split( '\n')
    .map( ( line, index ) => {
      if ( line.trim() === '' && index === 0 ) return '';
      return `${ index + 1 } ${ line }`;
    } )
    .join( '\n' );
}

const code = multiline`
function add( a, b ) {
  return a + b;
}
`;

console.log( code );

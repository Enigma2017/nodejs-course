function debounce( func, delay ) {
  let timeoutId;
  return function ( ...args ) {
    clearTimeout( timeoutId );
    timeoutId = setTimeout( () => {
      func.apply( this, args );
    }, delay );
  };
}

function debouncedSearch( query ) {
  const log = document.getElementById( "log" );
  const time = new Date().toLocaleTimeString();
  log.innerHTML += `Searching for: "${query}" at ${time}<br>`;
}

const debouncedSearchHandler = debounce( debouncedSearch, 300 );

const inputElement = document.getElementById( "search-input" );
inputElement.addEventListener( "input", ( event ) => {
  debouncedSearchHandler( event.target.value );
} );
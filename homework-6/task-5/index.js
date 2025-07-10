function throttle( func, interval ) {
  let lastTime = 0;

  return function ( ...args ) {
    const now = Date.now();
    if ( now - lastTime >= interval ) {
      func.apply( this, args );
      lastTime = now;
    }
  };
}

function onScroll( event ) {
  const log = document.getElementById( "log" );
  const time = new Date().toLocaleTimeString();
  log.textContent = `Scroll at ${time}`;
  console.log( "Scroll event:", time );
}

const throttledScrollHandler = throttle( onScroll, 1000 );

window.addEventListener( "scroll", throttledScrollHandler );

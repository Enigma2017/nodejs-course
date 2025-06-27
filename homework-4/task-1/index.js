function customFilterUnique( array, callback ) {
  const seen = new Set();
  return array.filter( item => {
    const key = callback(item);
    if ( seen.has(key) ) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice again' },
  { id: 3, name: 'Charlie' },
  { id: 2, name: 'Bob again' },
];

const uniqueUsers = customFilterUnique( users, user => user.id );

console.log( 'The unique users by id:' );
console.log(uniqueUsers);
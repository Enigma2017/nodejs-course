class CustomHashTable {
  constructor( initialCapacity = 8 ) {
    this._capacity = initialCapacity;
    this._buckets = Array.from({ length: this._capacity }, () => []);
    this._size = 0;
  }

  /* Custom hash function -> Converts a string key into a bucket index */
  _hash(key) {
    let hash = 0;
    const PRIME = 31;
    for ( let i = 0; i < key.length; i++ ) {
      hash = ( hash * PRIME + key.charCodeAt(i) ) % this._capacity;
    }
    return hash;
  }

  /* Insert key-value pair. If key exists -> update value */
  insert( key, value ) {
    const index = this._hash(key);
    const bucket = this._buckets[index];

    for ( let pair of bucket ) {
      if ( pair[0] === key ) {
        pair[1] = value;
        return;
      }
    }

    bucket.push( [key, value] );
    this._size++;

    // Resize if load factor > 0.7
    if ( this._size / this._capacity > 0.7 ) {
      this._resize( this._capacity * 2 );
    }
  }

  /* Retrieve value by key */
  get(key) {
    const index = this._hash(key);
    const bucket = this._buckets[index];

    for ( let pair of bucket ) {
      if ( pair[0] === key ) {
        return pair[1];
      }
    }
    return undefined;
  }

  /* Delete key-value pair */
  delete(key) {
    const index = this._hash(key);
    const bucket = this._buckets[index];

    for ( let i = 0; i < bucket.length; i++ ) {
      if ( bucket[i][0] === key ) {
        bucket.splice( i, 1 );
        this._size--;
        return true;
      }
    }
    return false;
  }

  /* Resize the table when load factor is too high */
  _resize(newCapacity) {
    const oldBuckets = this._buckets;
    this._capacity = newCapacity;
    this._buckets = Array.from({ length: this._capacity }, () => []);
    this._size = 0;

    for ( let bucket of oldBuckets ) {
      for ( let [key, value] of bucket ) {
        this.insert( key, value );
      }
    }
  }

  /* Get total number of stored keys */
  size() {
    return this._size;
  }

  /* Iterate through all key-value pairs */
  entries() {
    const result = [];
    for ( let bucket of this._buckets ) {
      for ( let [key, value] of bucket ) {
        result.push( [key, value] );
      }
    }
    return result;
  }
}

/* Testing the Hash Table */

function runTests() {
  console.log( "=== Custom Hash Table Tests ===" );
  const table = new CustomHashTable();

  // Insert
  table.insert( "name", "Kateryna" );
  table.insert( "age", 38 );
  table.insert( "city", "Dnipro" );
  table.insert( "job", "Frontend Dev" );

  console.log( "Get name ->", table.get("name") );
  console.log( "Get age ->", table.get("age") ); 
  console.log( "Size ->", table.size() );

  // Update
  table.insert( "age", 39 );
  console.log( "Updated age ->", table.get("age") ); 

  // Collision test (force collision by using different keys)
  table.insert( "abc", "first" );
  table.insert( "acb", "second" );
  console.log( "Collision keys:", table.get("abc"), table.get("acb") );

  // Delete
  table.delete( "city" );
  console.log( "Deleted city ->", table.get("city") );
  console.log( "Size ->", table.size() );

  // Iterate
  console.log( "Entries:", table.entries() );

  // Stress test (resize check)
  for ( let i = 0; i < 20; i++ ) {
    table.insert( "key" + i, "val" + i );
  }
  console.log( "Size after stress test:", table.size() );
  console.log( "Table entries after resize:", table.entries().length );
}

runTests();

/**
 * ================================
 *   Analysis
 * ================================
 * 
 * Custom hash function:
 *   - Uses polynomial rolling (base 31) modulo table capacity.
 *   - Distributes keys more uniformly than naive sum of char codes.
 * 
 * Collision Resolution:
 *   - Separate chaining with arrays (each bucket stores a small list of pairs).
 * 
 * Operations (average case, assuming good hash distribution):
 *   - insert: O(1)
 *   - get: O(1)
 *   - delete: O(1)
 *   - resize: O(n) but rare (amortized O(1))
 * 
 * Trade-offs:
 *   - Chose separate chaining (simpler to implement than open addressing).
 *   - Added dynamic resizing for better performance under high load.
 *   - Could replace arrays in buckets with linked lists for faster deletes.
 */

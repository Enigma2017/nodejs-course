// Stack
class Stack {
  constructor() {
    this._items = [];
  }

  // push: O(1)
  push(value) {
    this._items.push(value);
  }

  // pop: O(1)
  pop() {
    return this._items.pop();
  }

  // peek: O(1)
  peek() {
    return this._items[ this._items.length - 1 ];
  }

  isEmpty() {
    return this._items.length === 0;
  }

  size() {
    return this._items.length;
  }
}

// Queue (FIFO)
class Queue {
  constructor() {
    this._items = [];
  }

  // enqueue: O(1) (amortized for array push)
  enqueue(value) {
    this._items.push(value);
  }

  // dequeue: O(n) if using shift; to keep O(1) you'd implement ring buffer.
  // For simplicity we use an index to avoid shifting cost.
  dequeue() {
    return this._items.shift();
  }

  // peek: O(1)
  peek() {
    return this._items[0];
  }

  isEmpty() {
    return this._items.length === 0;
  }

  size() {
    return this._items.length;
  }
}

// Binary Tree (not necessarily BST)
class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  // Insert using BFS to keep tree roughly balanced (not BST insert)
  // Time: O(n) in worst case (we search for a spot)
  insert(value) {
    const node = new BinaryTreeNode(value);
    if ( !this.root ) {
      this.root = node;
      return node;
    }

    const q = [this.root];
    while (q.length) {
      const current = q.shift();
      if ( !current.left ) {
        current.left = node;
        return node;
      } else {
        q.push( current.left );
      }

      if ( !current.right ) {
        current.right = node;
        return node;
      } else {
        q.push( current.right );
      }
    }
  }

  // Search value (BFS) - O(n)
  search(value) {
    if ( !this.root ) return null;
    const q = [ this.root ];
    while ( q.length ) {
      const n = q.shift();
      if ( n.value === value ) return n;
      if ( n.left ) q.push( n.left );
      if ( n.right ) q.push( n.right );
    }
    return null;
  }

  // Traversals (recursive)
  inorder( node = this.root, visit = (v) => console.log(v) ) {
    if (!node) return;
    this.inorder( node.left, visit );
    visit( node.value );
    this.inorder( node.right, visit );
  }

  preorder( node = this.root, visit = (v) => console.log(v) ) {
    if (!node) return;
    visit( node.value );
    this.preorder( node.left, visit );
    this.preorder( node.right, visit );
  }

  postorder( node = this.root, visit = (v) => console.log(v) ) {
    if (!node) return;
    this.postorder( node.left, visit );
    this.postorder( node.right, visit );
    visit( node.value );
  }
}

// Graph (adjacency list) - undirected by default
class Graph {
  constructor( directed = false ) {
    this.adj = new Map();
    this.directed = directed;
  }

  addVertex(v) {
    if ( !this.adj.has(v) ) this.adj.set( v, new Set() );
  }

  addEdge( a, b, weight = 1 ) {
    if ( !this.adj.has(a) ) this.addVertex(a);
    if ( !this.adj.has(b) ) this.addVertex(b);

    this.adj.get(a).add( { node: b, weight } );
    if ( !this.directed ) this.adj.get(b).add( { node: a, weight } );
  }

  // Helper to get neighbors as array of {node, weight}
  neighbors(v) {
    if ( !this.adj.has(v) ) return [];
    return Array.from( this.adj.get(v) );
  }

  // Depth-first search (iterative) - returns visited order
  dfs(start) {
    if ( !this.adj.has(start) ) return [];
    const visited = new Set();
    const stack = [start];
    const order = [];

    while ( stack.length ) {
      const v = stack.pop();
      if ( visited.has(v) ) continue;
      visited.add(v);
      order.push(v);

      const neigh = this.neighbors(v).map( x => x.node );
      for ( let i = neigh.length - 1; i >= 0; i-- ) {
        if ( !visited.has(neigh[i]) ) stack.push( neigh[i] );
      }
    }
    return order;
  }

  // Breadth-first search - returns visited order
  bfs(start) {
    if ( !this.adj.has(start) ) return [];
    const visited = new Set( [start] );
    const q = [start];
    const order = [];

    while ( q.length ) {
      const v = q.shift();
      order.push(v);
      for ( const { node } of this.neighbors(v) ) {
        if ( !visited.has(node) ) {
          visited.add(node);
          q.push(node);
        }
      }
    }
    return order;
  }
}

// Singly Linked List
class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this._size = 0;
  }

  // Insert at head: O(1)
  insertAtHead(value) {
    const n = new ListNode(value);
    n.next = this.head;
    this.head = n;
    this._size++;
    return n;
  }

  // Insert at end: O(n)
  insertAtEnd(value) {
    const n = new ListNode(value);
    if ( !this.head ) {
      this.head = n;
      this._size++;
      return n;
    }
    let cur = this.head;
    while ( cur.next ) cur = cur.next;
    cur.next = n;
    this._size++;
    return n;
  }

  // Delete first occurrence of value: O(n)
  delete(value) {
    if ( !this.head ) return false;
    if ( this.head.value === value ) {
      this.head = this.head.next;
      this._size--;
      return true;
    }
    let prev = this.head;
    let cur = this.head.next;
    while (cur) {
      if ( cur.value === value ) {
        prev.next = cur.next;
        this._size--;
        return true;
      }
      prev = cur;
      cur = cur.next;
    }
    return false;
  }

  // Search: O(n)
  search(value) {
    let cur = this.head;
    while (cur) {
      if ( cur.value === value ) return cur;
      cur = cur.next;
    }
    return null;
  }

  size() {
    return this._size;
  }

  toArray() {
    const res = [];
    let cur = this.head;
    while (cur) {
      res.push( cur.value );
      cur = cur.next;
    }
    return res;
  }
}

// Part 2: Algorithmic Problems
// Min/Max Stack: support getMin and getMax in O(1)
class MinMaxStack {
  constructor() {
    this.stack = [];
  }

  push(value) {
    if ( this.stack.length === 0 ) {
      this.stack.push({ value, currentMin: value, currentMax: value });
    } else {
      const top = this.stack[ this.stack.length - 1 ];
      this.stack.push({
        value,
        currentMin: Math.min( value, top.currentMin ),
        currentMax: Math.max( value, top.currentMax ),
      });
    }
  }

  pop() {
    const el = this.stack.pop();
    return el ? el.value : undefined;
  }

  peek() {
    return this.stack.length ? this.stack[ this.stack.length - 1 ].value : undefined;
  }

  getMin() {
    return this.stack.length ? this.stack[ this.stack.length - 1 ].currentMin : undefined;
  }

  getMax() {
    return this.stack.length ? this.stack[ this.stack.length - 1 ].currentMax : undefined;
  }

  size() {
    return this.stack.length;
  }
}

// Binary Search Tree validation - check if a binary tree satisfies BST property
// Efficient approach: DFS with min/max constraints
function isBinarySearchTree(node) {
  function helper( n, min, max ) {
    if (!n) return true;
    if ( ( min !== null && n.value <= min ) || ( max !== null && n.value >= max ) ) return false;
    return helper( n.left, min, n.value ) && helper( n.right, n.value, max );
  }
  return helper( node, null, null );
}

// Dijkstra's algorithm for shortest path on weighted graph (non-negative weights)
// Returns { distanceMap, previousMap }
function dijkstra( graph, source ) {
  const adjMap = new Map();
  for ( const [ v, neighborsSet ] of graph.adj.entries() ) {
    adjMap.set( v, Array.from(neighborsSet) );
  }

  const dist = new Map();
  const prev = new Map();
  const pq = new MinPriorityQueue();

  for ( const v of adjMap.keys() ) {
    dist.set( v, Infinity );
    prev.set( v, null );
  }
  if ( !adjMap.has(source) ) throw new Error( 'Source vertex not in graph' );
  dist.set( source, 0 );
  pq.enqueue( source, 0 );

  while ( !pq.isEmpty() ) {
    const { element: u } = pq.dequeue();
    const alt = dist.get(u);
    for ( const { node: v, weight } of adjMap.get(u) ) {
      const newDist = alt + weight;
      if ( newDist < dist.get(v) ) {
        dist.set( v, newDist );
        prev.set( v, u );
        pq.enqueue( v, newDist );
      }
    }
  }

  return { distanceMap: dist, previousMap: prev };
}

// BFS shortest path for unweighted graph: returns path array from source to target (or null)
function bfsShortestPath( graph, source, target ) {
  if ( !graph.adj.has(source) || !graph.adj.has(target) ) return null;
  const visited = new Set([source]);
  const q = [source];
  const prev = new Map();

  while ( q.length ) {
    const v = q.shift();
    if ( v === target ) break;
    for ( const { node: nei } of graph.neighbors(v) ) {
      if ( !visited.has(nei) ) {
        visited.add(nei);
        prev.set( nei, v );
        q.push(nei);
      }
    }
  }

  if ( !prev.has(target) && source !== target ) return null;
  // reconstruct path
  const path = [];
  let cur = target;
  while ( cur !== undefined && cur !== null ) {
    path.push(cur);
    if ( cur === source ) break;
    cur = prev.get(cur);
  }
  return path.reverse();
}

// Floyd's Cycle Detection for linked lists
function hasCycle(head) {
  if ( !head ) return false;
  let slow = head;
  let fast = head;
  while ( fast && fast.next ) {
    slow = slow.next;
    fast = fast.next.next;
    if ( slow === fast ) return true;
  }
  return false;
}

// Helper: Simple Min Priority Queue implementation (binary heap)
// For Dijkstra. Not production-grade, but sufficient for demonstration.
class MinPriorityQueue {
  constructor() {
    this._heap = []; 
  }

  _parent(i) { return Math.floor( (i - 1) / 2 ); }
  _left(i) { return 2 * i + 1; }
  _right(i) { return 2 * i + 2; }

  isEmpty() { return this._heap.length === 0; }

  enqueue( element, priority ) {
    this._heap.push({ element, priority });
    this._siftUp( this._heap.length - 1 );
  }

  dequeue() {
    if ( this.isEmpty() ) return null;
    this._swap( 0, this._heap.length - 1 );
    const popped = this._heap.pop();
    this._siftDown(0);
    return popped;
  }

  _siftUp(idx) {
    while ( idx > 0 ) {
      const p = this._parent(idx);
      if ( this._heap[p].priority <= this._heap[idx].priority ) break;
      this._swap( p, idx );
      idx = p;
    }
  }

  _siftDown(idx) {
    while (true) {
      const l = this._left(idx);
      const r = this._right(idx);
      let smallest = idx;
      if ( l < this._heap.length && this._heap[l].priority < this._heap[smallest].priority ) smallest = l;
      if ( r < this._heap.length && this._heap[r].priority < this._heap[smallest].priority ) smallest = r;
      if ( smallest === idx ) break;
      this._swap( idx, smallest );
      idx = smallest;
    }
  }

  _swap( i, j ) {
    const t = this._heap[i];
    this._heap[i] = this._heap[j];
    this._heap[j] = t;
  }
}

// Demonstration / Usage
function demonstration() {
  console.log( '\n--- Stack demo ---' );
  const s = new Stack();
  s.push(1); s.push(2); s.push(3);
  console.log( 'peek', s.peek() ); // 3
  console.log( 'pop', s.pop() ); // 3

  console.log( '\n--- Queue demo ---' );
  const q = new Queue();
  q.enqueue('a'); q.enqueue('b'); q.enqueue('c');
  console.log( 'peek', q.peek() ); // 'a'
  console.log( 'dequeue', q.dequeue() ); // 'a'

  console.log( '\n--- BinaryTree demo ---' );
  const bt = new BinaryTree();
  [ 10, 5, 15, 3, 7, 12, 18 ].forEach( x => bt.insert(x) );
  console.log( 'in-order ( will not be sorted since this is not a BST insert ):' );
  let inorderValues = [];
  bt.inorder(bt.root, v => inorderValues.push(v));
  console.log(inorderValues.join(' '));
  console.log('\nsearch 7 ->', bt.search(7) ? 'found' : 'not found');

  console.log( '\n--- Graph demo ---' );
  const g = new Graph(false);
  g.addVertex('A'); g.addVertex('B'); g.addVertex('C'); g.addVertex('D');
  g.addEdge( 'A','B' ); g.addEdge( 'A','C' ); g.addEdge( 'B','D' ); g.addEdge( 'C','D' );
  console.log( 'DFS from A:', g.dfs('A') );
  console.log( 'BFS from A:', g.bfs('A') );

  console.log( '\n--- LinkedList demo ---' );
  const ll = new LinkedList();
  ll.insertAtEnd(1); ll.insertAtEnd(2); ll.insertAtEnd(3);
  ll.insertAtHead(0);
  console.log( 'list ->', ll.toArray() );
  ll.delete(2);
  console.log( 'after delete 2 ->', ll.toArray() );
  console.log( 'search 3 ->', ll.search(3) ? 'found' : 'not found' );

  console.log( '\n--- MinMaxStack demo ---' );
  const mm = new MinMaxStack();
  mm.push(5); mm.push(1); mm.push(7); mm.push(0);
  console.log( 'min', mm.getMin(), 'max', mm.getMax() ); // 0 and 7
  mm.pop();
  console.log( 'after pop min', mm.getMin() ); // 1

  console.log( '\n--- BST validation demo ---' );
  // Create a proper BST manually
  const bstRoot = new BinaryTreeNode(8);
  bstRoot.left = new BinaryTreeNode(4);
  bstRoot.right = new BinaryTreeNode(12);
  bstRoot.left.left = new BinaryTreeNode(2);
  bstRoot.left.right = new BinaryTreeNode(6);
  console.log( 'is BST?', isBinarySearchTree(bstRoot) ); // true

  // Spoil BST property
  bstRoot.right.left = new BinaryTreeNode(20); // invalid because 20 >= 12
  console.log( 'is BST after spoil?', isBinarySearchTree(bstRoot) ); // false

  console.log( '\n--- Graph shortest paths demo ---' );
  const g2 = new Graph(true);
  // Build small weighted graph A->B (2), A->C (5), B->C (1), C->D (2)
  g2.addEdge( 'A','B',2 );
  g2.addEdge( 'A','C',5 );
  g2.addEdge( 'B','C',1 );
  g2.addEdge( 'C','D',2 );
  const { distanceMap, previousMap } = dijkstra( g2, 'A' );
  console.log( 'distances from A:' );
  for ( const [k,v] of distanceMap.entries() ) console.log( k, v );
  console.log( 'BFS shortest path in unweighted graph from A to D ->', bfsShortestPath( g, 'A', 'D' ) );

  console.log( '\n--- Linked list cycle detection demo ---' );
  const cycList = new ListNode(1);
  cycList.next = new ListNode(2);
  cycList.next.next = new ListNode(3);
  // make a cycle
  cycList.next.next.next = cycList.next; // 3 -> 2
  console.log( 'has cycle?', hasCycle(cycList) ); // true
}

demonstration();
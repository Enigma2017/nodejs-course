// Book Class (Base)
class Book {
  constructor( title, author, isbn, price, availability = true ) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.price = price;
    this.availability = availability;
  }

  isAvailable() {
    return this.availability;
  }
}

// Fiction & NonFiction (Polymorphism via inheritance)
class FictionBook extends Book {
  constructor( title, author, isbn, price, genre ) {
    super( title, author, isbn, price );
    this.genre = genre;
  }
}

class NonFictionBook extends Book {
  constructor( title, author, isbn, price, subject ) {
    super( title, author, isbn, price );
    this.subject = subject;
  }
}

// User Class
class User {
  constructor( name, email ) {
    this.name = name;
    this.email = email;
    this.userId = User.generateId();
  }

  static generateId() {
    return Math.floor( Math.random() * 1000000 );
  }
}

// Cart Class
class Cart {
  constructor(user) {
    this.user = user;
    this.items = [];
  }

  addBook(book) {
    if ( book.isAvailable() ) {
      this.items.push(book);
      console.log( `${book.title} added to cart for ${this.user.name}.` );
    } else {
      console.log( `${book.title} is not available.` );
    }
  }

  removeBook(isbn) {
    this.items = this.items.filter( book => book.isbn !== isbn );
    console.log( `Book with ISBN ${isbn} removed from cart.` );
  }

  calculateTotal() {
    return this.items.reduce( ( sum, book ) => sum + book.price, 0 );
  }

  listItems() {
    return this.items.map( book => `- ${book.title} ($${book.price})` ).join('\n');
  }
}

// Order Class
class Order {
  constructor( user, books ) {
    this.user = user;
    this.books = books;
    this.total = books.reduce( ( sum, book ) => sum + book.price, 0 );
    this.date = new Date();
    this.orderId = Order.generateOrderId();
  }

  static generateOrderId() {
    return "ORD-" + Math.floor( Math.random() * 1000000 );
  }

  printSummary() {
    console.log( `\n Order Summary (${this.orderId}):` );
    console.log( `Customer: ${this.user.name} (${this.user.email})` );
    console.log( `Books:` );
    this.books.forEach( book => {
      console.log( ` - ${book.title} by ${book.author} - $${book.price}` );
    } );
    console.log( `Total: $${this.total.toFixed(2)}` );
    console.log( `Date: ${this.date.toLocaleString()}` );
  }
}

// Create Books
const book1 = new FictionBook( "1984", "George Orwell", "123-A", 15.99, "Dystopian" );
const book2 = new NonFictionBook( "Sapiens", "Yuval Noah Harari", "456-B", 20.00, "History" );
const book3 = new FictionBook( "The Hobbit", "J.R.R. Tolkien", "789-C", 12.50, "Fantasy" );

// Create Users
const userAlice = new User( "Alice", "alice@example.com" );
const userBob = new User( "Bob", "bob@example.com" );

// Alice adds books to cart
const cartAlice = new Cart(userAlice);
cartAlice.addBook(book1);
cartAlice.addBook(book2);

// Bob adds books to cart
const cartBob = new Cart(userBob);
cartBob.addBook(book3);

// Print cart totals
console.log( `\n Alice's Cart Total: $${cartAlice.calculateTotal().toFixed(2)}` );
console.log( `Bob's Cart Total: $${cartBob.calculateTotal().toFixed(2)}` );

// Place Orders
const orderAlice = new Order( userAlice, cartAlice.items );
orderAlice.printSummary();

const orderBob = new Order( userBob, cartBob.items );
orderBob.printSummary();

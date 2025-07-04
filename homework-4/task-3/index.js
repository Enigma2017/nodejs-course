function createBankAccount( initialBalance = 1000 ) {
  let _balance = initialBalance;

  return {
    get formattedBalance() {
      return `$${ _balance.toFixed(2) }`;
    },

    get balance() {
      return _balance;
    },

    set balance(newAmount) {
      if ( typeof newAmount !== "number" || newAmount < 0 ) {
        throw new Error( "The balance must be a number ≥ 0" );
      }
      _balance = newAmount;
    },

    transfer( targetAccount, amount ) {
      if ( typeof amount !== "number" || amount <= 0 ) {
        throw new Error( "Amount must be a positive number" );

      }

      if ( amount > this.balance ) {
        throw new Error( "There is not enough money on the account" );
      }

      this.balance = this.balance - amount;

      targetAccount.balance = targetAccount.balance + amount;
    },
  };
}

const account1 = createBankAccount(1000);
const account2 = createBankAccount(500);

console.log( "The initial balances:" );
console.log( "Account 1:", account1.formattedBalance );
console.log( "Account 2:", account2.formattedBalance );

account1.transfer( account2, 250 );

console.log( "\n After the transfer $250:" );
console.log( "Account 1:", account1.formattedBalance );
console.log( "Account 2:", account2.formattedBalance );

try {
  account1.balance = -100;
} catch (err) {
  console.error( "\n An Error:", err.message );
}

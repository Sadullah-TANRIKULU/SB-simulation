const investAmount = 5;
let totalcash = 20;

const totalCashDisplay = document.getElementById("totalcash");
const bookStock = document.getElementById("bookstock");

totalCashDisplay.innerHTML = `Total:  ${totalcash} `;

///////////////////////////////////////////////

class Product {
  constructor(name, cost, expense, price) {
    this.name = name;
    this.cost = cost;
    this.expense = expense;
    this.price = price;
  }
  stock = investAmount;
}

class Customer {
  constructor(name, want) {
    this.name = name;
    this.want = want;
  }
}

let book = new Product("Book", 17, 10, 5);

/////////////////////////////////////////////

const btn1 = document.getElementById("btn1");
const bookdeliver = document.createElement("button");
bookdeliver.innerText = "Deliver Book";
bookdeliver.id = "btn11";
const bookdeliversection = document.getElementById("book");

book.stock = 0;
function investBook() {
  if (totalcash >= 0 && totalcash >= book.cost) {
    bookStock.innerHTML = ` Book Stock :  ${(book.stock =
      book.stock + investAmount)}`;
    bookdeliversection.appendChild(bookdeliver);
    totalcash -= book.cost;
    totalCashDisplay.innerHTML = `Total:  ${totalcash} `;
  } else {
    console.log("baby no money to invest in something!!");
  }
}

btn1.addEventListener("click", investBook);

////////////////////////////////////////////////

const btn11 = document.getElementById("btn11");

function deliverBook() {
  if (book.stock >= 0) {
    bookStock.innerHTML = ` Book Stock :  ${book.stock--}`;
    totalcash += book.price;
    totalCashDisplay.innerHTML = `Total:  ${totalcash} `;
  } else {
    console.log("no book in stock");
  }
}
bookdeliver.addEventListener("click", deliverBook);

function randomCustomer() {}

// disable invest product button if not invested

// deliver product buttons

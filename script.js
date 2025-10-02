let totalcash = 20;
const investAmount = 5;

const totalCashDisplay = document.getElementById("totalcash");
const bookStock = document.getElementById("bookstock");
const lemonadeStock = document.getElementById("lemonadestock");
const warningSection = document.getElementById("warning");
const deliverEl = document.getElementById("deliver");

totalCashDisplay.innerHTML = `Total: ${totalcash}`;

class Product {
  constructor(name, cost, expense, price, stock = 0) {
    this.name = name;
    this.cost = cost;
    this.expense = expense;
    this.price = price;
    this.stock = stock;
    this.canDecrement = true; // flag per product for delivering limitation
  }
}

class Customer {
  constructor(name) {
    this.name = name;
  }
}

// Products and customers state initialized once globally
const products = [
  new Product("Book", 17, 10, 5),
  new Product("Lemonade", 10, 2, 4),
];

const customers = [new Customer("Maksym"), new Customer("Vitalii")];

// Cached buttons for delivery
const bookdeliver = document.createElement("button");
const lemonadedeliver = document.createElement("button");
bookdeliver.id = "btn11";
lemonadedeliver.id = "btn21";
bookdeliver.innerText = `Deliver ${products[0].name} ${products[0].price}$`;
lemonadedeliver.innerText = `Deliver ${products[1].name} ${products[1].price}$`;

// Append buttons once at initialization
document.getElementById("book").appendChild(bookdeliver);
document.getElementById("lemonade").appendChild(lemonadedeliver);

function showWarning(message) {
  warningSection.innerText = message;
  setTimeout(() => {
    warningSection.innerText = "";
  }, 2000);
}

function updateDisplay() {
  totalCashDisplay.innerHTML = `Total: ${totalcash}`;
  bookStock.innerHTML = `${products[0].name} Stock: ${products[0].stock}`;
  lemonadeStock.innerHTML = `${products[1].name} Stock: ${products[1].stock}`;
}

function invest(productIdx) {
  if (totalcash >= products[productIdx].cost) {
    products[productIdx].stock += investAmount;
    totalcash -= products[productIdx].cost;
    updateDisplay();
  } else {
    showWarning(`Not enough money (${totalcash}$) to invest!`);
  }
}

function deliver(productIdx) {
  const product = products[productIdx];
  if (product.stock > 0 && product.canDecrement) {
    product.stock--;
    product.canDecrement = false; // prevent multiple decrements before next customer
    totalcash += product.price;
    updateDisplay();
  } else if (product.stock <= 0) {
    showWarning(
      `Not enough product (${product.stock} ${product.name}) in stock`
    );
  }
}

// Attach invest event listeners once
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
btn1.addEventListener("click", () => invest(0));
btn2.addEventListener("click", () => invest(1));

// Attach deliver event listeners once
bookdeliver.addEventListener("click", () => deliver(0));
lemonadedeliver.addEventListener("click", () => deliver(1));

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomCustomer() {
  const randomCustomer = getRandomItem(customers);
  const randomProduct = getRandomItem(products);

  // Reset delivery allowance for the chosen product only
  products.forEach((p) => (p.canDecrement = true));

  if (randomCustomer && randomProduct) {
    deliverEl.innerHTML = `<br>${randomCustomer.name} wants a ${randomProduct.name}<br>`;
  } else {
    deliverEl.innerText = `No customer yet`;
  }
}

// Initial display update
updateDisplay();

// Start customer generation every 7 seconds
setInterval(randomCustomer, 7000);

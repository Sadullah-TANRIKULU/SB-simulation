let totalcash = 40;
const investAmount = 5;

const totalCashDisplay = document.getElementById("totalcash");
const bookStock = document.getElementById("bookstock");
const lemonadeStock = document.getElementById("lemonadestock");
const shoesStock = document.getElementById("shoesstock");
const laptopStock = document.getElementById("laptopstock");
const warningSection = document.getElementById("warning");
const deliverEl = document.getElementById("deliver");

totalCashDisplay.innerHTML = `Total: ${totalcash} $`;

class Product {
  constructor(name, cost, expense, price, stock = 0) {
    this.name = name;
    this.cost = cost;
    this.expense = expense;
    this.price = price;
    this.stock = stock;
    this.canDecrement = true;
  }
}

class Customer {
  constructor(name) {
    this.name = name;
  }
}

const products = [
  new Product("Book", 17, 10, 5),
  new Product("Lemonade", 10, 2, 4),
  new Product("Shoes", 23, 13, 11),
  new Product("Laptop", 28, 15, 17),
];

const customers = [
  new Customer("Maksym"),
  new Customer("Vitalii"),
  new Customer("Volodymyr"),
  new Customer("Yasha"),
  new Customer("Hamid"),
  new Customer("Ismail"),
  new Customer("Olha"),
  new Customer("Myhkhailo"),
];

let clientwant;
let timeoutID;

const bookdeliver = document.createElement("button");
const lemonadedeliver = document.createElement("button");
const shoesdeliver = document.createElement("button");
const laptopdeliver = document.createElement("button");

bookdeliver.id = "btn11";
lemonadedeliver.id = "btn21";
shoesdeliver.id = "btn31";
laptopdeliver.id = "btn41";

bookdeliver.innerText = `Deliver ${products[0].name} ${products[0].price}$`;
lemonadedeliver.innerText = `Deliver ${products[1].name} ${products[1].price}$`;
shoesdeliver.innerText = `Deliver ${products[2].name} ${products[2].price}$`;
laptopdeliver.innerText = `Deliver ${products[3].name} ${products[3].price}$`;

document.getElementById("book").appendChild(bookdeliver);
document.getElementById("lemonade").appendChild(lemonadedeliver);
document.getElementById("shoes").appendChild(shoesdeliver);
document.getElementById("laptop").appendChild(laptopdeliver);

const buttons = [bookdeliver, lemonadedeliver, shoesdeliver, laptopdeliver];

function showWarning(message, permanent = false) {
  warningSection.style.color = permanent ? "white" : "black";
  if (permanent) {
    warningSection.innerText = message;
  } else {
    warningSection.innerText = message;
    timeoutID = setTimeout(() => {
      warningSection.innerText = "";
    }, 2000);
  }
}

function updateDisplay() {
  totalCashDisplay.innerHTML = `Total: ${totalcash}`;
  bookStock.innerHTML = `${products[0].name} Stock: ${products[0].stock}`;
  lemonadeStock.innerHTML = `${products[1].name} Stock: ${products[1].stock}`;
  shoesStock.innerHTML = `${products[2].name} Stock: ${products[2].stock}`;
  laptopStock.innerHTML = `${products[3].name} Stock: ${products[3].stock}`;
}

function calcMonthlyExpenses() {
  let totalExpense = 0;
  for (const product of products) {
    if (product.stock > 0) {
      totalExpense += product.expense;
    }
  }
  return totalExpense;
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
  if (!clientwant) return;
  const product = products[productIdx];
  if (product.name !== clientwant.name) {
    showWarning(`client wants ( ${clientwant.name}) `);
  } else if (product.stock > 0 && product.canDecrement) {
    product.stock--;
    product.canDecrement = false;
    totalcash += product.price;
    updateDisplay();
  } else if (product.stock <= 0) {
    showWarning(
      `Not enough product (${product.stock} ${product.name}) in stock`
    );
  }
}

const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
btn1.addEventListener("click", () => {
  invest(0);
  checkValues(0);
});
btn2.addEventListener("click", () => {
  invest(1);
  checkValues(1);
});
btn3.addEventListener("click", () => {
  invest(2);
  checkValues(2);
});
btn4.addEventListener("click", () => {
  invest(3);
  checkValues(3);
});

bookdeliver.addEventListener("click", () => deliver(0));
lemonadedeliver.addEventListener("click", () => deliver(1));
shoesdeliver.addEventListener("click", () => deliver(2));
laptopdeliver.addEventListener("click", () => deliver(3));

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomCustomer() {
  const randomCustomer = getRandomItem(customers);
  const randomProduct = getRandomItem(products);
  clientwant = randomProduct;

  products.forEach((p) => (p.canDecrement = true));

  if (randomCustomer && randomProduct) {
    deliverEl.innerHTML = `<br>${randomCustomer.name} wants  ${clientwant.name}<br>`;
  } else {
    deliverEl.innerText = `No customer yet`;
  }
}

updateDisplay();

let customerMonthlyCount;
const custCount = [5000, 7000, 11000];

let customerInterval = setInterval(randomCustomer, customerMonthlyCount = 7000);
console.log(customerMonthlyCount);
let monthlyInterval = setInterval(() => {
  customerMonthlyCount = getRandomItem(custCount);
  console.log(customerMonthlyCount);
  
  let monthlyExpense = calcMonthlyExpenses();
  let message = `Monthly expenses paid ${monthlyExpense} $$$`;
  totalcash -= monthlyExpense;
  showWarning(message);
  updateDisplay();
  if (totalcash <= -100) {
    message = "GAME OVER, you ran out of money!";
    document.body.style.backgroundColor = "darkred";
    clearTimeout(timeoutID);
    showWarning(message, true);
    btn1.disabled = true;
    btn2.disabled = true;
    btn3.disabled = true;
    btn4.disabled = true;
    bookdeliver.disabled = true;
    lemonadedeliver.disabled = true;
    shoesdeliver.disabled = true;
    laptopdeliver.disabled = true;
    clearInterval(monthlyInterval);
    clearInterval(customerInterval);
    deliverEl.innerHTML = "Game Over";
  }
}, 40000);

// setting hidden attr true and removing it
function checkValues(value) {
  if (products[value].stock === 0) {
    buttons[value].setAttribute("hidden", true);
  } else {
    buttons[value].removeAttribute("hidden");
  }
}

function checkAllButtons() {
  products.forEach((el, idx) => {
    checkValues(idx);
  });
}

checkAllButtons();

// function gg(e) {
//   if (e.target !== "BUTTON") return

//   invest(e.target.dataset.id)

// }

let totalcash = 74;
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
  constructor(
    name,
    cost,
    expense,
    price,
    image = "./assets/default-product.png",
    stock = 0
  ) {
    this.name = name;
    this.cost = cost;
    this.expense = expense;
    this.price = price;
    this.stock = stock;
    this.canDecrement = true;
    this.image = image;
  }
}

class Customer {
  constructor(name) {
    this.name = name;
  }
}

const products = [
  new Product("Book", 17, 10, 5, "./assets/book.png"),
  new Product("Lemonade", 10, 2, 4, "./assets/lemonade.png"),
  new Product("Shoes", 23, 13, 11, "./assets/shoes.png"),
  new Product("Laptop", 28, 15, 17, "./assets/linux-laptop.png"),
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
  new Customer("Rana"),
  new Customer("Cedooooo"),
];

let clientwant;
let timeoutID;
let monthlyInterval;
let customerInterval;

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
  totalCashDisplay.innerHTML = `Total: ${totalcash} $`;
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
    if (totalcash > 81) {
      message = "YOU WIN, promoted master class!";
      document.body.style.backgroundColor = "limegreen";
      clearTimeout(timeoutID);
      showWarning(message, true);
      btn1.disabled = true;
      btn2.disabled = true;
      btn3.disabled = true;
      btn4.disabled = true;
      btn11.disabled = true;
      btn21.disabled = true;
      btn31.disabled = true;
      btn41.disabled = true;
      clearInterval(monthlyInterval);
      clearInterval(customerInterval);
      deliverEl.innerHTML = "You Win";
    }
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
const btn11 = document.getElementById("btn11");
const btn21 = document.getElementById("btn21");
const btn31 = document.getElementById("btn31");
const btn41 = document.getElementById("btn41");

const buttons = [btn11, btn21, btn31, btn41];

const investment = document.getElementById("investment");
function triggerInvest(e) {
  if (e.target.tagName !== "BUTTON") return;

  const id = Number(e.target.dataset.id);
  const type = e.target.dataset.type;

  console.log("id : ", id, " type : ", type);

  if (type === "invest") {
    invest(id);
    checkValues(id);
  } else if (type === "deliver") {
    deliver(id);
    checkValues(id);
  }
}
investment.addEventListener("click", triggerInvest);

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomCustomer() {
  const randomCustomer = getRandomItem(customers);
  const randomProduct = getRandomItem(products);
  clientwant = randomProduct;

  products.forEach((p) => (p.canDecrement = true));

  if (randomCustomer && randomProduct) {
    deliverEl.innerHTML = `<br>${randomCustomer.name} wants  ${clientwant.name} <img src="${clientwant.image}" width="20" > <br>`;
  } else {
    deliverEl.innerText = `No customer yet`;
  }
}

updateDisplay();

let customerMonthlyCount;
const custCount = [5000, 7000, 11000];

customerInterval = setInterval(randomCustomer, (customerMonthlyCount = 7000));
monthlyInterval = setInterval(() => {
  customerMonthlyCount = getRandomItem(custCount);

  let monthlyExpense = calcMonthlyExpenses();
  let message = `Monthly expenses paid ${monthlyExpense} $$$`;
  totalcash -= monthlyExpense;
  showWarning(message);
  updateDisplay();
  if (totalcash <= -80) {
    message = "GAME OVER, you ran out of money!";
    document.body.style.backgroundColor = "darkred";
    clearTimeout(timeoutID);
    showWarning(message, true);
    btn1.disabled = true;
    btn2.disabled = true;
    btn3.disabled = true;
    btn4.disabled = true;
    btn11.disabled = true;
    btn21.disabled = true;
    btn31.disabled = true;
    btn41.disabled = true;
    clearInterval(monthlyInterval);
    clearInterval(customerInterval);
    deliverEl.innerHTML = "Game Over";
  }
}, 40000);

// setting hidden attr true and removing it
// function checkValues(value) {
//   if (products[value].stock === 0) {
//     buttons[value].setAttribute("hidden", true);
//   } else {
//     buttons[value].removeAttribute("hidden");
//   }
// }
function checkValues(value) {
  const deliverBtn = document.querySelector(`button[data-type="deliver"][data-id="${value}"]`);
  if (!deliverBtn) return;

  if (products[value].stock === 0) {
    deliverBtn.setAttribute("hidden", true);
  } else {
    deliverBtn.removeAttribute("hidden");
  }
}

function checkAllButtons() {
  products.forEach((el, idx) => {
    checkValues(idx);
  });
}

checkAllButtons();

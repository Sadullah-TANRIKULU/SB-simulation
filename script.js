let totalCash = 74;
const investAmount = 5;

const totalCashDisplay = document.getElementById("totalcash");
const bookStock = document.getElementById("bookstock");
const lemonadeStock = document.getElementById("lemonadestock");
const shoesStock = document.getElementById("shoesstock");
const laptopStock = document.getElementById("laptopstock");
const warningSection = document.getElementById("warning");
const deliverEl = document.getElementById("deliver");
const currentNews = document.getElementById("current-news");
// const gif = document.getElementById("gif");

const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn11 = document.getElementById("btn11");
const btn21 = document.getElementById("btn21");
const btn31 = document.getElementById("btn31");
const btn41 = document.getElementById("btn41");

totalCashDisplay.innerText = `Total: ${totalCash} $`;

const investment = document.getElementById("investment");

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
  new Customer("Recep"),
  new Customer("Muhammed"),
  new Customer("Sadullah"),
  new Customer("Ilker"),
  new Customer("Maksym"),
  new Customer("Vitalii"),
  new Customer("Volodymyr"),
  new Customer("Yasha"),
  new Customer("Hamid"),
  new Customer("Ismail"),
  new Customer("Olha"),
  new Customer("Heliya"),
  new Customer("Pranverë"),
  new Customer("Karina"),
  new Customer("Burcu"),
  new Customer("Denys"),
  new Customer("Olexandr"),
  new Customer("Selamawit"),
  new Customer("Tetiana"),
  new Customer("Sofiia"),
  new Customer("Viktoriia"),
  new Customer("Rana"),
  new Customer("Cedooooo"),
];

let clientwant = null;
let timeoutID;
let monthlyInterval;
let customerInterval;

const newsPool = [
  "Tech boom increases demand for laptop and smart devices.",
  "Fuel prices rise, investors turn to electric cars.",
  "Summer heat drives people to buy more lemonade.",
  "Everything's fine as usual, no special news",
  "New fashion trends boost shoes sales worldwide.",
  "Reading culture rises — book stores see record profits.",
  "Cycling becomes the new fitness craze of the decade.",
  "Coffee consumption surges among remote workers.",
];

const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");

const h1 = document.getElementById("h1");

///////////////////////////////////////////////////////////////////
h1.addEventListener("click", () => {
  modal.style.display = "block";
});

closeBtn.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
////////////////////////////////////////////////////////////////////
function showWarning(message, permanent = false) {
  if (timeoutID) clearTimeout(timeoutID);

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
//////////////////////////////////////////////////////////////////////////
function updateDisplay() {
  totalCashDisplay.innerText = `Total: ${totalCash} $`;
  bookStock.innerText = `${products[0].name} Stock: ${products[0].stock}`;
  lemonadeStock.innerText = `${products[1].name} Stock: ${products[1].stock}`;
  shoesStock.innerText = `${products[2].name} Stock: ${products[2].stock}`;
  laptopStock.innerText = `${products[3].name} Stock: ${products[3].stock}`;
  checkAllButtons();
}
//////////////////////////////////////////////////////////////////////////////
function calcMonthlyExpenses() {
  let totalExpense = 0;
  for (const product of products) {
    if (product.stock > 0) {
      totalExpense += product.expense;
    }
  }
  return totalExpense;
}
///////////////////////////////////////////////////////////////////////////////////
function disableAllButtons() {
  [btn1, btn2, btn3, btn4, btn11, btn21, btn31, btn41].forEach((btn) => {
    if (btn) btn.disabled = true;
  });
}
//////////////////////////////////////////////////////////////////////////////////
function invest(productIdx) {
  if (totalCash >= products[productIdx].cost) {
    products[productIdx].stock += investAmount;
    totalCash -= products[productIdx].cost;
    updateDisplay();
  } else {
    showWarning(`Not enough money (${totalCash}$) to invest!`);
  }
}
/////////////////////////////////////////////////////////////////////////////////////
function deliver(productIdx) {
  if (!clientwant) return;
  const product = products[productIdx];
  if (product.name !== clientwant.name) {
    showWarning(`client wants ( ${clientwant.name}) `);
  } else if (product.stock > 0 && product.canDecrement) {
    product.stock--;
    product.canDecrement = false;
    totalCash += product.price;
    updateDisplay();
    if (totalCash > 81) {
      let message = "YOU WIN, promoted master class!";
      document.body.style.backgroundColor = "limegreen";
      clearTimeout(timeoutID);
      showWarning(message, true);
      disableAllButtons();
      clearInterval(monthlyInterval);
      clearInterval(customerInterval);
      deliverEl.innerText = "You Win";
      return;
    }
  } else if (product.stock <= 0) {
    showWarning(
      `Not enough product (${product.stock} ${product.name}) in stock`
    );
  }
}
/////////////////////////////////////////////////////////////////////////////////////////
function triggerInvestAndDeliver(e) {
  if (e.target.tagName !== "BUTTON") return;

  const id = Number(e.target.dataset.id);
  const type = e.target.dataset.type;

  if (type === "invest") {
    invest(id);
    checkValues(id);
  } else if (type === "deliver") {
    deliver(id);
    checkValues(id);
  }
}
investment.addEventListener("click", triggerInvestAndDeliver);
//////////////////////////////////////////////////////////////////////////////////////////////
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
//////////////////////////////////////////////////////////////////////////////////////////
function getRandomProduct(productsArr) {
  const randomNews = currentNews.innerText.toLowerCase();

  const trending = productsArr.filter((p) => {
    const lowerProduct = p.name.toLowerCase();
    return randomNews.includes(lowerProduct);
  });
  const influenceChance = 0.489;

  if (trending.length !== 0 && Math.random() < influenceChance) {
    // adjust the randomization by < 0.48
    clientwant = trending[Math.floor(Math.random() * trending.length)];
  } else {
    // regular stuff
    clientwant = productsArr[Math.floor(Math.random() * productsArr.length)];
  }
  return clientwant;
}
///////////////////////////////////////////////////////////////////////////////////////////

let currentBg = true;
function randomCustomer() {
  const randomCustomer = getRandomItem(customers);
  const randomProduct = getRandomProduct(products);

  products.forEach((p) => (p.canDecrement = true));

  if (randomCustomer && randomProduct) {
    deliverEl.innerHTML = `<br>${randomCustomer.name} wants  ${clientwant.name} <img src="${clientwant.image}" width="20" > <br>`;

    switch (currentBg) {
      case true:
        deliverEl.style.backgroundColor = "rgb(255, 253, 208)";
        currentBg = false;
        break;
      case false:
        deliverEl.style.backgroundColor = "rgb(77, 213, 153)";
        currentBg = true;
        break;
      default:
        deliverEl.style.backgroundColor = "rgb(77, 213, 153)";
        currentBg = true;
        break;
    }
  } else {
    deliverEl.innerText = `No customer yet`;
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////
function updateNews() {
  const randomNews = getRandomItem(newsPool);
  currentNews.innerText = `Hot news:  ${randomNews}`;

  return randomNews;
}
updateNews();
updateDisplay();
///////////////////////////////////////////////////////////////////////////////////////////////
let customerMonthlyCount = 7000;
const custCount = [5000, 7000, 11000];

customerMonthlyCount = getRandomItem(custCount);
customerInterval = setInterval(randomCustomer, customerMonthlyCount);

function resetCustomerInterval(newDelay) {
  clearInterval(customerInterval);
  customerInterval = setInterval(randomCustomer, newDelay);
}
/////////////////////////////////////////////////////////////////////////////////////////////
monthlyInterval = setInterval(() => {
  updateNews();
  let monthlyExpense = calcMonthlyExpenses();
  let message = `Monthly expenses paid ${monthlyExpense} $$$`;
  totalCash -= monthlyExpense;

  showWarning(message);
  updateDisplay();

  if (totalCash <= -80) {
    message = "GAME OVER, you ran out of money!";
    document.body.style.backgroundColor = "darkred";
    if (timeoutID) clearTimeout(timeoutID);
    showWarning(message, true);
    disableAllButtons();
    clearInterval(monthlyInterval);
    clearInterval(customerInterval);
    deliverEl.innerText = "Game Over";
    return;
  }
  const newDelay = getRandomItem(custCount);
  resetCustomerInterval(newDelay);
}, 40000);
/////////////////////////////////////////////////////////////////////////
function checkValues(value) {
  const deliverBtn = document.querySelector(
    `button[data-type="deliver"][data-id="${value}"]`
  );
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

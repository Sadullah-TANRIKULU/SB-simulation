let totalcash = 20;
let investAmount = 0;

const totalCashDisplay = document.getElementById("totalcash");
const bookStock = document.getElementById("bookstock");
const lemonadeStock = document.getElementById("lemonadestock");
const warningSection = document.getElementById("warning");

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


  const products = [
    new Product("Book", 17, 10, 5),
    new Product("Lemonade", 10, 2, 4),
  ];
  const productRandomIdx = Math.floor(Math.random() * products.length);
  let customers = [
    new Customer("Maksym", products[productRandomIdx]),
    new Customer("Vitalii", products[productRandomIdx]),
  ];
  const customerRandomIdx = Math.floor(Math.random() * customers.length);


/////////////////////////////////////////////
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const bookdeliver = document.createElement("button");
const lemonadedeliver = document.createElement("button");

function investInBook(productIdx) {
  bookdeliver.id = "btn11";

  const bookdeliversection = document.getElementById("book");

  const investAmount = 5;
  if (totalcash >= 0 && totalcash >= products[productIdx].cost) {
    bookStock.innerHTML = ` ${products[productIdx].name} Stock :  ${(products[
      productIdx
    ].stock = products[productIdx].stock + investAmount)}`;
    bookdeliver.innerText = `Deliver ${products[0].name} ${products[0].price}$`;
    bookdeliversection.appendChild(bookdeliver);

    totalcash -= products[productIdx].cost;
    totalCashDisplay.innerHTML = `Total:  ${totalcash} `;
  } else {
    warningSection.innerText = `baby not enough money(${totalcash}$) to invest in something!!`;
    setTimeout(() => {
      warningSection.innerText = "";
    }, 2000);
  }
}

function investInLemonade(productIdx) {
  lemonadedeliver.id = "btn21";

  const lemonadedeliversection = document.getElementById("lemonade");
  const investAmount = 5;
  if (totalcash >= 0 && totalcash >= products[productIdx].cost) {
    lemonadeStock.innerHTML = ` ${
      products[productIdx].name
    } Stock :  ${(products[productIdx].stock =
      products[productIdx].stock + investAmount)}`;

    lemonadedeliver.innerText = `Deliver ${products[1].name} ${products[1].price}$`;
    lemonadedeliversection.appendChild(lemonadedeliver);
    totalcash -= products[productIdx].cost;
    totalCashDisplay.innerHTML = `Total:  ${totalcash} `;
  } else {
    warningSection.innerText = `baby not enough money(${totalcash}$) to invest in something!!`;
    setTimeout(() => {
      warningSection.innerText = "";
    }, 2000);
  }
}
btn1.addEventListener("click", () => investInBook(0));
btn2.addEventListener("click", () => investInLemonade(1));

////////////////////////////////////////////////

const btn11 = document.getElementById("btn11");
const btn21 = document.getElementById("btn21");

function deliverBook() {
  if (products[0].stock > 0) {
    products[0].stock--;
    bookStock.innerHTML = ` ${products[0].name} Stock : ${products[0].stock} `;
    totalcash += products[0].price;
    totalCashDisplay.innerHTML = `Total:  ${totalcash} `;
  } else {
    warningSection.innerText = `not enough product(${
      products[0].stock + " " + products[0].name
    }) in stock`;
    setTimeout(() => {
      warningSection.innerText = "";
    }, 2000);
  }
}

function deliverLemonade() {
  if (products[1].stock > 0) {
    products[1].stock--;
    lemonadeStock.innerHTML = ` ${products[1].name} Stock : ${products[1].stock} `;
    totalcash += products[1].price;
    totalCashDisplay.innerHTML = `Total:  ${totalcash} `;
  } else {
    warningSection.innerText = `not enough product(${
      products[1].stock + " " + products[1].name
    }) in stock`;
    setTimeout(() => {
      warningSection.innerText = "";
    }, 2000);
  }
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomCustomer() {

const deliver = document.getElementById("deliver");
  const randomCustomer = getRandomItem(customers);
  const randomProduct = getRandomItem(products);
  if (randomCustomer && randomProduct) {
    deliver.innerHTML = `<br>${randomCustomer.name} wants a ${randomProduct.name}<br>`;
    
    bookdeliver.addEventListener("click", deliverBook);
    lemonadedeliver.addEventListener("click", deliverLemonade);
    return { customer: randomCustomer, want: randomProduct };
  } else {
    deliver.innerText = `no customer yet`;
    return null;
  }
}
setInterval(() => {
  randomCustomer();
}, 9000);

// disable invest product button if not invested

// deliver product buttons

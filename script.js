import bookImg from "url:./assets/book.png";
import lemonadeImg from "url:./assets/lemonade.png";
import shoesImg from "url:./assets/shoes.png";
import laptopImg from "url:./assets/linux-laptop.png";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase credentials missing! Check your .env file.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const playerId =
  localStorage.getItem("sb_simulation_player_id") || crypto.randomUUID();
localStorage.setItem("sb_simulation_player_id", playerId);

let gameStartTime = Date.now();
let timerInterval;

function updateTimer() {
  const elapsed = Date.now() - gameStartTime;

  const hours = Math.floor(elapsed / (1000 * 60 * 60));
  const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

  const timerDisplay = document.getElementById("timer");
  timerDisplay.innerText = `⏱ ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

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

const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn11 = document.getElementById("btn11");
const btn21 = document.getElementById("btn21");
const btn31 = document.getElementById("btn31");
const btn41 = document.getElementById("btn41");
const btn111 = document.getElementById("btn111");
const btn211 = document.getElementById("btn211");
const btn311 = document.getElementById("btn311");
const btn411 = document.getElementById("btn411");

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
  new Product("Book", 17, 10, 5, bookImg),
  new Product("Lemonade", 10, 2, 4, lemonadeImg),
  new Product("Shoes", 23, 13, 11, shoesImg),
  new Product("Laptop", 28, 15, 17, laptopImg),
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
let emergencyInterval;

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

async function triggerWin() {
  let message = "YOU WIN, promoted master class!";
  document.body.style.backgroundColor = "limegreen";

  clearTimeout(timeoutID);
  showWarning(message, true);
  disableAllButtons();
  clearInterval(monthlyInterval);
  clearInterval(customerInterval);
  deliverEl.innerText = "You Win";

  const finalSeconds = Math.floor((Date.now() - gameStartTime) / 1000);

  setTimeout(async () => {
    const nickname = prompt(
      "CEO Rank Achieved! Enter your name:",
      "Anonymous Boss"
    );
    if (nickname) {
      await supabase.from("leaderboard").insert([
        {
          player_id: playerId,
          nickname: nickname,
          completion_time_seconds: finalSeconds,
        },
      ]);
    }
    modal.style.display = "block";
    displayLeaderboard();
  }, 500);
}

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
//////////////////////////////////////////////////////////////////////////////////
timerInterval = setInterval(updateTimer, 1000);
updateTimer();

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
  [
    btn1,
    btn2,
    btn3,
    btn4,
    btn11,
    btn21,
    btn31,
    btn41,
    btn111,
    btn211,
    btn311,
    btn411,
  ].forEach((btn) => {
    if (btn) btn.disabled = true;
  });
  clearInterval(timerInterval);
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
    if (totalCash >= 0) {
      totalCashDisplay.style.backgroundColor = "#00918E";
    }
    updateDisplay();
    if (totalCash > 101) {
      triggerWin();

      return;
    }
  } else if (product.stock <= 0) {
    showWarning(
      `Not enough product (${product.stock} ${product.name}) in stock`
    );
  }
}
/////////////////////////////////////////////////////////////////////////////////////////
function sellBack(productIdx) {
  const product = products[productIdx];
  if (product.stock > 1) {
    product.stock = 0;
    totalCash += product.price;
    if (totalCash >= 0) {
      totalCashDisplay.style.backgroundColor = "#00918E";
    }
    updateDisplay();
    if (totalCash > 101) {
      triggerWin();

      return;
    }
  }
}
////////////////////////////////////////////////////////////////////////////////
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
  } else if (type === "sellback") {
    sellBack(id);
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
  const influenceChance = 0.611;

  if (trending.length !== 0 && Math.random() < influenceChance) {
    clientwant = trending[Math.floor(Math.random() * trending.length)];
  } else {
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
    deliverEl.innerHTML = `<br>${randomCustomer.name} wants  ${
      clientwant.name
    } <img src="${String(clientwant.image)}" width="35" ><br>`;

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
  if (totalCash < 0) {
    totalCashDisplay.style.backgroundColor = "#ff0000";
  }
  showWarning(message);
  updateDisplay();

  if (totalCash <= -40) {
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
emergencyInterval = setInterval(() => {
  if (totalCash < 10) {
    totalCash += 10;
    alert(
      "Emergency funding received: $10 injected to keep your business running!"
    );
    updateDisplay();
  }
}, 80000);
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
/////////////////////////////////////////////////////////////////////////////////

async function displayLeaderboard() {
  const tbody = document.getElementById("leaderboardBody");
  if (!tbody) return;

  tbody.innerHTML =
    "<tr><td colspan='3' style='text-align:center;'>Loading...</td></tr>";

  const { data, error } = await supabase
    .from("leaderboard")
    .select("nickname, completion_time_seconds")
    .order("completion_time_seconds", { ascending: true })
    .limit(10);

  if (error) {
    tbody.innerHTML =
      "<tr><td colspan='3' style='color:red;'>Error connecting to Supabase</td></tr>";
    return;
  }

  tbody.innerHTML = data
    .map(
      (entry, index) => `
        <tr style="border-bottom: 1px solid rgba(0,0,0,0.1);">
            <td style="padding: 8px;">${index + 1}</td>
            <td style="padding: 8px;">${entry.nickname}</td>
            <td style="padding: 8px;">${entry.completion_time_seconds}s</td>
        </tr>
    `
    )
    .join("");
}

// Initialize on load and link the refresh button from the HTML I provided earlier
displayLeaderboard();
const refreshBtn = document.getElementById("refreshLeaderboard");
if (refreshBtn) {
  refreshBtn.addEventListener("click", displayLeaderboard);
}

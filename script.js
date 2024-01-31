'use strict';

//// PRODUCT ////

const iPhone = {
  pname: 'I Phone',
  Amount: 15000,
};

const smartTv = {
  pname: 'Smart TV',
  Amount: 13000,
};

const laptop = {
  pname: 'Dell Laptop',
  Amount: 10000,
};

const keyboard = {
  pname: 'Logitech Keyboard',
  Amount: 500,
};

const mouse = {
  pname: 'HP Mouse',
  Amount: 300,
};

const penDrive = {
  pname: 'Sandisk USB',
  Amount: 200,
};

const ssd = {
  pname: 'Kingston SSD',
  Amount: 2500,
};

const printer = {
  pname: 'Canon Printer',
  Amount: 12000,
};

const speaker = {
  pname: 'JBL 5.1 Speaker',
  Amount: 30000,
};

const cctv = {
  pname: 'Bosch CCTV',
  Amount: 10000,
};

const tablets = {
  pname: 'Samsung Galaxy Tab',
  Amount: 21000, 
};

const smartwatches = {
  pname: 'Noise colorFit Pro 5',
  Amount: 4500,
};

const bluetooth_headsets = {
  pname: 'Boat Rockerz 450',
  Amount: 1500,
};

const powerbanks = {
  pname: ' 10000 mAh 12W Fast Charging Power Bank',
  Amount: 500, 
};

//// ACCOUNT ////

const account1 = {
  owner: 'Atharva Phadtare',
  movements: [
    { amount: -100000, product: laptop, quantity: 10 },
    { amount: -500000, product: iPhone, quantity: 4 },
    { amount: 4000, product: keyboard, quantity: 8 },
    { amount: -3600, product: mouse, quantity: 12 },
    { amount: 17500, product: ssd, quantity: 7 },
    { amount: 270000, product: speaker, quantity: 9 },
    { amount: -900000, product: printer, quantity: 8 },
    { amount: 1600, product: penDrive, quantity: 8 },
    { amount: -40500, product: smartwatches, quantity: 9 },
    { amount: 252000, product: tablets, quantity: 12 },
  ],
  pin: 1111,
};

const account2 = {
  owner: 'Harsh Kapse',
  movements: [
    { amount: -100000, product: laptop, quantity: 11 },
    { amount: 125000, product: iPhone, quantity: 9 },
    { amount: 4000, product: keyboard, quantity: 8 },
    { amount: -1000, product: mouse, quantity: 5 },
    { amount: -20000, product: ssd, quantity: 8 },
    { amount: 150000, product: speaker, quantity: 5 },
    { amount: -900000, product: printer, quantity: 8 },
    { amount: 1600, product: penDrive, quantity: 8 },
    { amount: 7500, product: bluetooth_headsets, quantity: 5 },
    { amount: 3500, product: powerbanks, quantity: 7 },
  ],
  pin: 2222,
};

const account3 = {
  owner: 'Vinayak Panchal',
  movements: [
    { amount: 100000, product: laptop, quantity: 10 },
    { amount: 150000, product: iPhone, quantity: 10 },
    { amount: -5000, product: keyboard, quantity: 10 },
    { amount: -1800, product: mouse, quantity: 6 },
    { amount: 27500, product: ssd, quantity: 11 },
    { amount: -270000, product: speaker, quantity: 9 },
    { amount: -60000, product: printer, quantity: 5 },
    { amount: 60000, product: cctv, quantity: 6 },
    { amount: -45000, product: smartwatches, quantity: 10 },
    { amount: 189000, product: tablets, quantity: 9 },
    
  ],
  pin: 3333,
};

const account4 = {
  owner: 'Binayak Bhatacharjee',
  movements: [
    { amount: 100000, product: laptop, quantity: 10 },
    { amount: 120000, product: iPhone, quantity: 8 },
    { amount: -180000, product: speaker, quantity: 6 },
    { amount: -120000, product: printer, quantity: 10 },
    { amount: -80000, product: cctv, quantity: 8 },
    { amount: 40500, product: smartwatches, quantity: 9 },
    { amount: -91000, product: smartTv, quantity: 7 },
    { amount: 15000, product: bluetooth_headsets, quantity: 10 },
    { amount: -126000, product: tablets, quantity: 6 },
    { amount: 5500, product: powerbanks, quantity: 11 },
  ],
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
const products = [iPhone, smartTv, laptop, keyboard, mouse, penDrive,ssd, printer, speaker, cctv, tablets, smartwatches, bluetooth_headsets, powerbanks];

//// HANDLERS ////

const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const mainApp = document.querySelector('.main');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferQuantity = document.querySelector('.form__input--qty');
const inputTransferName = document.querySelector('.form__input--pname');
const inputLoanAmount = document.querySelector('.form__input--loan-qty');
const inputLoanName = document.querySelector('.form__input--loan-pname');
const inputLoanFrom = document.querySelector('.form__input--loan-from');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//// FUNCTIONS ////

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a.amount - b.amount)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov.amount > 0 ? 'Sell' : 'Buy';
    const productName = mov.product.pname;
    let quantity = mov.quantity;


    if (type === 'Sell' && quantity > 0) {

      quantity = -quantity;
    } else if (type === 'Buy' && quantity < 0) {

      quantity = -quantity;
    }

 
    const totalQuantity = acc.movements
      .filter(m => m.product.pname.toLowerCase() === productName.toLowerCase())
      .reduce((total, m) => total + m.quantity, 0);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__pname">${productName} (${quantity})</div>
        <div class="movements__value">₹${mov.amount}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};


const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov.amount > 0)
    .reduce((acc, mov) => acc + mov.amount, 0);
  labelSumIn.textContent = `₹${incomes}`;

  const out = acc.movements
    .filter(mov => mov.amount < 0)
    .reduce((acc, mov) => acc + mov.amount, 0);
  labelSumOut.textContent = `₹${Math.abs(out)}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);


let currentAccount;
let sorted = false;

btnLogin.addEventListener('click', function (e) {

  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {

    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    mainApp.style.opacity = 100;

    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
   
    };


    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  if (!currentAccount) return;

  const transferToUsername = inputTransferTo.value;
  const receiverAccount = accounts.find(acc => acc.username === transferToUsername);

  if (!receiverAccount) {
    console.log('Receiver account not found.');
    return;
  }

  const transferQuantity = Number(inputTransferQuantity.value);
  const productName = inputTransferName.value.trim();

  if (isNaN(transferQuantity) || transferQuantity === 0) {
    console.log('Invalid transfer quantity.');
    return;
  }

  const product = products.find(prod => prod.pname === productName);

  if (!product) {
    console.log('Product not found. Available products:', products.map(prod => prod.pname));
    return;
  }

  const availableQuantity = currentAccount.movements
    .filter(mov => mov.product === product)
    .reduce((total, mov) => total + mov.quantity, 0);

  if (transferQuantity > availableQuantity) {
    console.log('Insufficient quantity to transfer.');
    return;
  }

  const transferredMovement = {
    product,
    quantity: transferQuantity,
    amount: transferQuantity * product.Amount,
  };


  currentAccount.movements.push({
    ...transferredMovement,
    quantity: -transferredMovement.quantity,
    amount: -transferredMovement.amount,
  });

  receiverAccount.movements.push(transferredMovement);

  // Update UI
  updateUI(currentAccount);

  // Clear input fields
  inputTransferTo.value = inputTransferQuantity.value = inputTransferName.value = '';
});



btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const quantity = Number(inputLoanAmount.value);
  const productName = inputLoanName.value.trim(); // Get the product name

  if (quantity > 0 && currentAccount.movements[0].quantity >= quantity * 0.1) {
    // Find the product by name
    const product = products.find((prod) => prod.pname === productName);

    if (product) {
      // Add movement
      currentAccount.movements.push({
        product,
        quantity,
        amount: quantity * product.Amount,
      });

      // Update UI
      updateUI(currentAccount);
    } else {
      console.log('Product not found');
    }
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    mainApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

// Function to update the pie chart
'use strict';



// Function to update the overall bar graph
function updateOverallBarGraph(account) {
  const overallStats = account.movements.reduce((stats, movement) => {
    const { product, quantity } = movement;
    if (product) {
      if (!stats[product.pname]) {
        stats[product.pname] = 0;
      }
      stats[product.pname] += Math.abs(quantity);
    }
    return stats;
  }, {});

  const overallChartData = Object.entries(overallStats).map(([product, quantity]) => [product, quantity]);

  drawBarGraph([['Product', 'Quantity']].concat(overallChartData), 'overallChart');
}

// Function to update the buy pie chart
function updateBuyPieChart(account) {
  const buyStats = account.movements
    .filter(movement => movement.amount < 0)
    .reduce((stats, movement) => {
      const { product, quantity } = movement;
      if (product) {
        if (!stats[product.pname]) {
          stats[product.pname] = 0;
        }
        stats[product.pname] += Math.abs(quantity);
      }
      return stats;
    }, {});

  const buyChartData = Object.entries(buyStats).map(([product, quantity]) => [product, quantity]);

  drawPieChart([['Product', 'Buy Quantity']].concat(buyChartData), 'buyChart');
}

// Function to update the sell pie chart
function updateSellPieChart(account) {
  const sellStats = account.movements
    .filter(movement => movement.amount > 0)
    .reduce((stats, movement) => {
      const { product, quantity } = movement;
      if (product) {
        if (!stats[product.pname]) {
          stats[product.pname] = 0;
        }
        stats[product.pname] += Math.abs(quantity);
      }
      return stats;
    }, {});

  const sellChartData = Object.entries(sellStats).map(([product, quantity]) => [product, quantity]);

  drawPieChart([['Product', 'Sell Quantity']].concat(sellChartData), 'sellChart');
}


function updateUI(account) {
  displayMovements(account, sorted);
  calcDisplaySummary(account);
  updateOverallBarGraph(account);
  updateBuyPieChart(account);
  updateSellPieChart(account);
}

function drawBarGraph(data, chartId) {
  google.charts.load('current', { 'packages': ['corechart'] });

  google.charts.setOnLoadCallback(function () {
    var chartData = google.visualization.arrayToDataTable(data);

    var options = {
      title: 'Overall Product Statistics',
      legend: { position: 'none' },
      vAxis: { title: 'Quantity' },

    };

    var chart = new google.visualization.ColumnChart(document.getElementById(chartId));
    chart.draw(chartData, options);
  });
}

// Function to draw the pie chart
function drawPieChart(data, chartId) {
  google.charts.load('current', { 'packages': ['corechart'] });

  google.charts.setOnLoadCallback(function () {
    var chartData = google.visualization.arrayToDataTable(data);

    var options = {
      title: chartId === 'overallChart' ? 'Product Statistics' : (chartId === 'buyChart' ? 'Buy Product Statistics' : 'Sell Product Statistics'),
      height: 400,
      width: 400, 
    };

    var chart = new google.visualization.PieChart(document.getElementById(chartId));
    chart.draw(chartData, options);
  });
}


const chartContainerWrapper = document.createElement('div');
chartContainerWrapper.classList.add('chart-container-wrapper');


document.body.appendChild(chartContainerWrapper);
chartContainerWrapper.appendChild(document.getElementById('buyChart'));
chartContainerWrapper.appendChild(document.getElementById('sellChart'));


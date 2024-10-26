'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1}
          ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
  console.log(acc.balance);
};

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, mov) => acc + mov);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsername(accounts);

const updateUI = function (acc) {
  displayMovements(acc.movements);

  calcDisplayBalance(acc);

  calcDisplaySummary(acc);
};

let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    inputLoginUsername.value = inputLoginPin.value = '';
    // lose curseor focus of pin
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  let amount = Number(inputTransferAmount.value);
  let receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferTo.blur();

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.userName != currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );

    accounts.splice(index, 1);
    containerApp.style.opacity = 0;

  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/* let arr = ['a' , 'b' , 'c' , 'd' , 'e'];
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice());

console.log([...arr]); */

/* console.log(arr.splice(2)); */
/* arr.splice(-1);
console.log(arr);

arr = ['a' , 'b' , 'c' , 'd' , 'e'];
let arr2 = ['j' , 'i' , 'h' , 'g' , 'f'];
arr2.reverse();
console.log(arr2);
console.log([...arr].reverse());
console.log(arr);

console.log(arr.concat(arr2));

console.log([...arr,...arr2]);

console.log(arr.join(' - ')); */

/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
for (const move of movements) {
  if (move > 0) {
    console.log(`you deposeted ${move} dollars`);
  } else {
    console.log(`ypu withdraw ${Math.abs(move)} dollars`);
  }
}

console.log('----------forEach----------');

movements.forEach(function (mmm , i){
  if (mmm > 0) {
    console.log(`Movement ${i +1 }: you deposeted ${mmm} dollars`);
  } else {
    console.log(`Movement ${i +1 }: you withdraw ${Math.abs(mmm)} dollars`);
  }
}) */

/*   const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
  ]);

  currencies.forEach(function (value, key, map){
    console.log(`${key}: ${value}`);
  }) */

/* const arr1 = [3, 5, 2, 12, 7];
const arr2 = [4, 1, 15, 8, 3];

const arr1Copy = arr1.slice(1,3);
console.log(arr1Copy);

const merged = [...arr1Copy, ...arr2];

merged.forEach(function(val, i){
    if (val >= 3){
      console.log(`Dog number ${i + 1} is an adult, and is ${val} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy`);
    }
}); */

/* const eroToUsd = 1.1;
const movementsUSD = movements.map(function (mov) {
  return mov * eroToUsd;
});

console.log(movements);
console.log(movementsUSD);

const movementsUSD2 = movements.map(mov => mov * eroToUsd);
console.log(movementsUSD2);

const movementsDiscription = movements.map(
  (mov, i) =>
    `movement ${i + 1} you ${mov > 0 ? 'deposeted' : 'withdraw'}: ${Math.abs(
      mov
    )}`
);

console.log(movementsDiscription); */

/* const deposits = movements.filter(mov => mov > 0);
console.log(deposits);

const withdrawls = movements.filter(mov => mov < 0);
console.log(withdrawls);

const balance = movements.reduce(function (acc, cur) {
  return acc + cur;
}, 0);
console.log(balance);


const max = movements.reduce(function(acc, mov) {
  return acc > mov ? acc : mov;
}, movements[0]);

console.log(max);

const calcAverageHumanAge = function(dogs) {
  const humanAge = dogs.map(function(val) {
    return val <= 2 ? val * 2 : 16 + val * 4;
  });

  const oldDogs = humanAge.filter(function(val) {
    return val >= 18;
  });

  const avg = oldDogs.reduce(function(acc, val) {
    return acc + val;
  }, 0) / oldDogs.length;

  return avg;
}
const Data1 = [16, 6, 10, 5, 6, 1, 4];
console.log(calcAverageHumanAge(Data1)); */

/* const totalDepositeUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * 1.1)
  .reduce((acc, mov) => acc + mov);
console.log(totalDepositeUSD); */

/* const calcAverageHumanAge = function(dogs) {
    const humanAge = dogs.map(function(val) {
      return val <= 2 ? val * 2 : 16 + val * 4;
    });
  
    const oldDogs = humanAge.filter(function(val) {
      return val >= 18;
    });
  
    const avg = oldDogs.reduce(function(acc, val) {
      return acc + val;
    }, 0) / oldDogs.length;
  
    return avg;
  }
  const Data1 = [16, 6, 10, 5, 6, 1, 4];
  console.log(calcAverageHumanAge(Data1)); */

/* const calcAverageHumanAge = dogs =>
  dogs
    .map(val => (val <= 2 ? val * 2 : 16 + val * 4))
    .filter(val => val >= 18)
    .reduce((acc, val, i, arr) =>acc + val / arr.length, 0);

const Data1 = [16, 6, 10, 5, 6, 1, 4];
console.log(calcAverageHumanAge(Data1)); */

// const withdrawl = movements.find(mov => mov < 0);
// console.log(withdrawl);

// console.log(accounts);
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// const ss = 'fares metwally elshafey';
// console.log(ss.split(' ')[0]);



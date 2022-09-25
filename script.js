const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.equal');
const clearBtn = document.querySelector('.clear');
const userInput = document.querySelector('.user-input');
const result = document.querySelector('.result');

let firstNumber = '';
let currentNumber = '';
let operation = '';

document.addEventListener('keyup', keyboardSupport);
clearBtn.addEventListener('click', reset);
equalBtn.addEventListener('click', calculate);

numberBtns.forEach((number) => {
  number.addEventListener('click', (e) => {
    handleNumber(e.target.innerText);
  });
});

operatorBtns.forEach((operator) => {
  operator.addEventListener('click', (e) => {
    handleOperator(e.target.innerText);
  });
});

function handleNumber(number) {
  if (number == '←') {
    currentNumber = currentNumber.slice(0, -1);
    userInput.value = currentNumber;
    return;
  } else if (currentNumber == '0' && number == '0') {
    return;
  } else if (number == '.' && currentNumber.includes('.')) {
    return;
  } else if (result.value != '' && currentNumber == '') {
    reset();
  }
  userInput.value += number;
  currentNumber += number;
}

function handleOperator(op) {
  if (userInput.value == '' && result.value == '') {
    return;
  } else if (isNaN(userInput.value.slice(-1)) && firstNumber != '') {
    userInput.value = userInput.value.slice(0, -1);
  } else if (
    userInput.value.includes('+') ||
    userInput.value.includes('-') ||
    userInput.value.includes('*') ||
    userInput.value.includes('/') ||
    userInput.value.includes('%')
  ) {
    calculate();
  } else if (firstNumber == '') {
    firstNumber = currentNumber;
    currentNumber = '';
  }
  userInput.value += op;
  operation = op;
}

function calculate() {
  if (firstNumber == '' || currentNumber == '') {
    return;
  }

  let newResult = 0;
  firstNumber = Number(firstNumber);
  currentNumber = Number(currentNumber);

  if (operation == '+') {
    newResult = firstNumber + currentNumber;
  } else if (operation == '-') {
    newResult = firstNumber - currentNumber;
  } else if (operation == '/') {
    newResult = firstNumber / currentNumber;
  } else if (operation == '*') {
    newResult = firstNumber * currentNumber;
  } else if (operation == '%') {
    newResult = (firstNumber * 100) / currentNumber;
  }

  handleResult(newResult);
}

function handleResult(newResult) {
  result.value = newResult;
  firstNumber = newResult;
  currentNumber = '';
  userInput.value = '';
}

function keyboardSupport(e) {
  e.preventDefault();

  if (e.key == 'Enter') {
    calculate();
  } else if (
    e.key === '+' ||
    e.key === '-' ||
    e.key === '/' ||
    e.key === '*' ||
    e.key === '%'
  ) {
    handleOperator(e.key);
  }
}

function reset() {
  firstNumber = '';
  currentNumber = '';
  operation = '';
  userInput.value = '';
  result.value = '';
}

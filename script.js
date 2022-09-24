const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.equal');
const clearBtn = document.querySelector('.clear');
const userInput = document.querySelector('.user-input');
const result = document.querySelector('.result');

let firstNumber = '';
let secondNumber = '';
let operatorCheck = false;
let operation = '';

equalBtn.addEventListener('click', calculate);
clearBtn.addEventListener('click', reset);

numberBtns.forEach((number) => {
  number.addEventListener('click', (e) => {
    if (number.classList.contains('zero') && userInput.value == '') {
      return;
    }

    if (!operatorCheck && result.value != '' && userInput.value == '') {
      userInput.value += e.target.innerText;
      result.value = '';
      firstNumber = e.target.innerText;
    } else if (operatorCheck) {
      userInput.value += e.target.innerText;
      secondNumber += e.target.innerText;
    } else {
      userInput.value += e.target.innerText;
      firstNumber += e.target.innerText;
    }
  });
});

operatorBtns.forEach((operator) => {
  operator.addEventListener('click', (e) => {
    if (userInput.value == '' && firstNumber == '') {
      return;
    } else if (isNaN(userInput.value.slice(-1)) && firstNumber != '') {
      userInput.value = userInput.value.slice(0, -1);
    }
    userInput.value += e.target.innerText;
    operatorCheck = true;
    operation = e.target.innerText;
  });
});

function calculate() {
  let newResult = 0;
  firstNumber = Number(firstNumber);
  secondNumber = Number(secondNumber);

  if (operation == '+') {
    newResult = firstNumber + secondNumber;
  } else if (operation == '-') {
    newResult = firstNumber - secondNumber;
  } else if (operation == '/') {
    newResult = firstNumber / secondNumber;
  } else if (operation == '*') {
    newResult = firstNumber * secondNumber;
  } else if (operation == '%') {
    newResult = (firstNumber * 100) / secondNumber;
  }

  handleResult(newResult);
}

function handleResult(newResult) {
  result.value = newResult;
  firstNumber = newResult;
  secondNumber = '';
  userInput.value = '';
  operatorCheck = false;
}

function reset() {
  firstNumber = '';
  secondNumber = '';
  operatorCheck = false;
  operation = '';
  userInput.value = '';
  result.value = '';
}

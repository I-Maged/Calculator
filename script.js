const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.equal');
const userInput = document.querySelector('.user-input');
const result = document.querySelector('.result');

let firstNumber = '';
let secondNumber = '';
let operatorCkeck = false;
let operation = '';

numberBtns.forEach((number) => {
  number.addEventListener('click', (e) => {
    if (number.classList.contains('zero') && userInput.value == '') {
      return;
    }
    userInput.value += e.target.innerText;
    if (operatorCkeck || result.value != '') {
      secondNumber += e.target.innerText;
      console.log(`secondNumber = ${secondNumber}`);
    } else {
      firstNumber += e.target.innerText;
      console.log(`firstNumber = ${firstNumber}`);
    }
  });
});

operatorBtns.forEach((operator) => {
  operator.addEventListener('click', (e) => {
    operatorCkeck = true;
  });
});

equalBtn.addEventListener('click', calculate);

function calculate() {
  userInput.value = Number(firstNumber) + Number(secondNumber);
}

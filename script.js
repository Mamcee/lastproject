let firstNumber = '';
let secondNumber = '';
let currentOperator = '';
let shouldResetDisplay = false;

const onButton = document.getElementById('on');
const offButton = document.getElementById('off');
const allButtons = document.querySelectorAll('button');
const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.digits');
const operatorButtons = document.querySelectorAll('.operate');

// Handle number clicks
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (shouldResetDisplay) {
      display.value = '';
      shouldResetDisplay = false;
    }

    if (value === '.' && display.value.includes('.')) return;

    display.value += value;
  });
});

// Handle operator clicks
operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    const op = button.textContent;

    if (op === 'clear') {
      display.value = '';
      firstNumber = '';
      secondNumber = '';
      currentOperator = '';
      return;
    }

    if (op === 'Delete') {
      if (shouldResetDisplay) {
        shouldResetDisplay = false;
        return;
      }
      display.value = display.value.slice(0, -1);
      return;
    }

    if (op === '=') {
      secondNumber = display.value;
      display.value = operate(firstNumber, secondNumber, currentOperator);
      firstNumber = display.value;
      currentOperator = '';
      return;
    }

    // If it's +, -, *, /, %
    firstNumber = display.value;
    currentOperator = op;
    shouldResetDisplay = true;
  });
});

// ON and OFF logic
offButton.addEventListener('click', () => {
  display.value = '';
  display.disabled = true;

  allButtons.forEach(button => {
    if (button.id !== 'on') {
      button.disabled = true;
    }
  });
});

onButton.addEventListener('click', () => {
  display.disabled = false;
  allButtons.forEach(button => {
    button.disabled = false;
  });
});

// Math operations
function operate(a, b, operate) {
  a = parseFloat(a);
  b = parseFloat(b);

  switch (operate) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b !== 0 ? a / b : 'Error';
    case '%': return a % b;
    default: return '';
  }
}

const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

//Manage Operators
const performCalculation = {
	
	'/': (firstOperand, secondOperand) => firstOperand / secondOperand,
	'*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand
};

function inputDigit(digit) {
    const {
        displayValue,
        waitingForSecondOperand
    } = calculator;

    if (waitingForSecondOperand === true) { // waiting to enter a second number
        calculator.displayValue = digit; // if the calculator waiting to get a second number and user enter a second number, then second number is assign as the display value
        calculator.waitingForSecondOperand = false; // now waitingForSecondOperand variable set to false since we do not need any numbers to enter
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit; // displayValue = 0 and entered digit adding to 0 and display the second value. (in case first number not entered, else condtion get executed)
    }

    console.log(calculator);
}

function inputDecimal(dot) {
	
	if (calculator.waitingForSecondOperand===true)return; // preventing the decimal point appended to the displayValue (only if the user entered nothing after type a dot. ex: 100.  )
    // If the `displayValue` does not contain a decimal point
    if (!calculator.displayValue.includes(dot)) {
        // Append the decimal point
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    const {
        firstOperand,
        displayValue,
        operator
    } = calculator
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }

    if (firstOperand == null) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const currentValue = firstOperand || 0;
        const result = performCalculation[operator](currentValue, inputValue);

        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}

function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

function resetCalculator(){
	
	calculator.displayValue = '0';
	calculator.firstOperand = null;
	calculator.waitingForSecondOperand= null;
	calculator.operator = null;
	console.log(calculator);
	
	
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const {
        target
    } = event;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('all-clear')) {
       resetCalculator();
        updateDisplay();
	   //console.log('all-clear',target.value);
        return;
    }

    inputDigit(target.value);
    updateDisplay();
});
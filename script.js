let firstNumber = null
let secondNumber = null
let operator = null
let buttons = document.querySelectorAll(".btn");
let display = document.getElementById("display");
let warning = document.getElementById("warning");
let screenText = display.textContent
let message = ''

buttons.forEach((button) => {
    let buttonText = button.textContent;
    let cla = button.getAttribute('class');
    button.addEventListener('click', () => buttonClicked(buttonText, cla))});


function toDisplayOrNotToDisplay (buttonText, cla) {
    if (!cla.includes('nodisplay')){
        display.textContent = buttonText
        screenText = display.textContent
    }
}

function warn (message) {
    warning.textContent = message
}

function buttonClicked(buttonText, cla) {
        if (cla.includes('number')){
            if (firstNumber == null) {
                    firstNumber = buttonText
                    toDisplayOrNotToDisplay(buttonText, cla)
            }
            else if (secondNumber == null) {
                if (!(operator == null)) {
                    secondNumber = buttonText
                    toDisplayOrNotToDisplay(buttonText, cla)
                }
                else {
                    warn('Please pick the operator before picking the second number')
                    console.log(operator)
                }
            }
            else {
                warn('You have picked both numbers already')
            }
        }
        if (cla.includes('operator')){
            if (operator == null) {
                if (firstNumber == null) {
                    warn('Please pick a number before picking the operator')
                }
                else {
                    operator = buttonText
                    toDisplayOrNotToDisplay(buttonText, cla)
                }
            }
        }
        if (cla.includes('equal')){
            if (!(firstNumber == null) && !(secondNumber == null) && !(operator == null)) {
                display.textContent = operate(firstNumber, secondNumber, operator)
            }
            else {
                warn('Please pick two numbers and an operator before proceding')
            } 
        }
}

function add(a, b) {
    return parseFloat(a) + parseFloat(b)
}

function subtract(a, b) {
    return parseFloat(a) - parseFloat(b)
}

function multiply(a, b) {
    return parseFloat(a) * parseFloat(b)
}

function divide(a, b) {
    return parseFloat(a) / parseFloat(b)
}

function operate(firstNumber, secondNumber, operator) {
    if (operator == '+') {
        return add(firstNumber, secondNumber)
    }
    if (operator == '-') {
        return subtract(firstNumber, secondNumber)
    }
    if (operator == '×') {
        return multiply(firstNumber, secondNumber)
    }
    if (operator == '÷') {
        return divide(firstNumber, secondNumber)
    }
}

// TODO Pick multiple digit numbers
// Style warning div
// What to do if other buttons are clicked
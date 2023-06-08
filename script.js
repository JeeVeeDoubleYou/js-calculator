let firstNumber
let secondNumber
let operator

// const equal = document.getElementById('equal');
// equal.addEventListener('click', function() {console.log(display.textContent)})

let buttons = document.querySelectorAll(".btn");
let display = document.getElementById("display");
let screenText

buttons.forEach((button) => {
    let buttonText = button.textContent;
    let cla = button.getAttribute('class');
    button.addEventListener('click', () => buttonClicked(buttonText, cla))});

function buttonClicked(buttonText, cla) {
        if (!cla.includes('nodisplay')){
            display.textContent = buttonText
            screenText = display.textContent
        }
}

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function operate(firstNumber, secondNumber, operator) {
    if (operator == '+') {
        return add(firstNumber, secondNumber)
    }
    if (operator == '-') {
        return subtract(firstNumber, secondNumber)
    }
    if (operator == '*') {
        return multiply(firstNumber, secondNumber)
    }
    if (operator == '/') {
        return divide(firstNumber, secondNumber)
    }
}
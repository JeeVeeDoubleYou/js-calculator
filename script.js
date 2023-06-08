let firstNumber = null
let secondNumber = null
let operator = null
let buttons = document.querySelectorAll(".btn");
let display = document.getElementById("display");
let warning = document.getElementById("warning");
let screenText = display.textContent
let message = ''
let secondOperator = false

buttons.forEach((button) => {
    let buttonText = button.textContent;
    let cla = button.getAttribute('class');
    button.addEventListener('click', () => buttonClicked(buttonText, cla))});


function toDisplayOrNotToDisplay (buttonText, cla, onlyDisplayed) {
    if (!cla.includes('nodisplay')){
        if (onlyDisplayed) {
            display.textContent = buttonText
        }
        else {
            display.textContent += buttonText
        }
            screenText = display.textContent
        
    }
}

function warn (message) {
    warning.textContent = message
}

function dontWarn () {
    warn('')
}

function buttonClicked(buttonText, cla) {
        if (cla.includes('number')){
            if (firstNumber == null) {
                    firstNumber = buttonText
                    toDisplayOrNotToDisplay(buttonText, cla, true)
                    dontWarn()
            }
            else if (secondNumber == null) {
                if (!(operator == null)) {
                    secondNumber = buttonText
                    toDisplayOrNotToDisplay(buttonText, cla, false)
                    dontWarn()
                }
                else {
                    warn('Please pick the operator before picking the second number')
                }
            }
            else {
                warn('You have picked both numbers already')
            }
            secondOperator = false
        }
        if (cla.includes('operator')){
            if (operator == null) {
                if (firstNumber == null) {
                    warn('Please pick a number before picking the operator')
                }
                else {
                    operator = buttonText
                    toDisplayOrNotToDisplay(buttonText, cla, false)
                    dontWarn()
                }
            }
            if (!(firstNumber == null) && !(secondNumber == null) && !(operator == null)) {
                firstNumber = operate(firstNumber, secondNumber, operator)
                display.textContent = firstNumber
                operator = buttonText
                toDisplayOrNotToDisplay(buttonText, cla, false)
                secondOperator = true
            }
        }
        if (cla.includes('equal')){
            if (!(firstNumber == null) && !(secondNumber == null) && !(operator == null)) {
                firstNumber = operate(firstNumber, secondNumber, operator)
                display.textContent = firstNumber
            }
            else {
                warn('Please pick two numbers and an operator before proceding')
            } 
        }
        if (cla.includes('AC')) {
            firstNumber = null
            secondNumber = null
            operator = null
            display.textContent = '0'
            dontWarn()
        }
        if (cla.includes('justC')) {
            dontWarn()
            if (secondOperator) {
                display.textContent = firstNumber
                operator = null
            }
            else if (!(secondNumber == null)) {
                display.textContent = firstNumber + operator
                secondNumber = null
            }
            else if (!(operator == null)) {
                display.textContent = firstNumber
                operator = null
            }
            else {
                display.textContent = '0'
                firstNumber = null
            }
        }
        if (cla.includes('percent')) {
            display.textContent = display.textContent / 100 
            firstNumber = Math.round(display.textContent * 10000) / 10000
            display.textContent = firstNumber
            secondNumber = null
            operator = null
            dontWarn()
        }
        if (cla.includes('signchange')) {
            if (!(secondNumber == null)) {
                secondNumber *= '-1'
                if (secondNumber < 0) {
                    display.textContent = firstNumber + operator + '(' + secondNumber + ')'
                }
                else {
                    display.textContent = firstNumber + operator + secondNumber
                }
            }
            else {
                firstNumber *= '-1'
                display.textContent = firstNumber

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

function operate(a, b, op) {
    let answer
    if (op == '+') {
        answer = add(a, b)
    }
    if (op == '-') {
        answer =  subtract(a, b)
    }
    if (op == '×') {
        answer = multiply(a, b)
    }
    if (op == '÷') {
        answer = divide(a, b)
    }
    secondNumber = null
    operator = null
    dontWarn()
    answer = Math.round(answer * 10000) / 10000
    return answer
}

// TODO Pick multiple digit numbers
// Style warning div
// What to do if other buttons are clicked

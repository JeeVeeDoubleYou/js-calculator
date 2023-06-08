let firstNumber = null
let secondNumber = null
let operator = null
let buttons = document.querySelectorAll(".btn");
let display = document.getElementById("display");
let warning = document.getElementById("warning");
let message = ''
let secondOperator = false
let writingFirstNumber = false
let writingSecondNumber = false
let decimalIsInNumber = false

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
    }
}

function warn (message) {
    warning.textContent = message
}

function dontWarn () {
    warn('')
}

function buttonClicked(buttonText, cla) {
    dontWarn()
        if (cla.includes('number')){
            if (firstNumber == null || writingFirstNumber) {
                if (firstNumber == null) {
                    firstNumber = buttonText
                    toDisplayOrNotToDisplay(buttonText, cla, true)
                    writingFirstNumber = true
                }
                else if (writingFirstNumber) {
                    firstNumber += buttonText
                    toDisplayOrNotToDisplay(buttonText, cla, false)
                }

            }
            else if (secondNumber == null || writingSecondNumber) {
                if (!(operator == null)) {
                    if (secondNumber == null) {
                        secondNumber = buttonText
                        toDisplayOrNotToDisplay(buttonText, cla, false)
                        writingSecondNumber = true
                    }
                    else if (writingSecondNumber) {
                        secondNumber += buttonText
                        toDisplayOrNotToDisplay(buttonText, cla, false)
                    }
                }
                else {
                    writingFirstNumber = true
                    firstNumber += buttonText
                    display.textContent = firstNumber
                }
            }
            else {
                warn('You have picked both numbers already')
            }
            secondOperator = false
        }
        if (cla.includes('decimal')){
            if (decimalIsInNumber) {
                warn("You can't add a second decimal point")
                return
            }
            if (writingFirstNumber) {
                firstNumber = firstNumber + '.'
                display.textContent = firstNumber
                decimalIsInNumber = true
            }
            if (writingSecondNumber) {
                secondNumber = secondNumber + '.'
                display.textContent = firstNumber + operator + secondNumber
                decimalIsInNumber = true
            }
        }
        if (cla.includes('operator')){
            writingFirstNumber = false
            writingSecondNumber = false
            decimalIsInNumber = false
            if (operator == null) {
                if (firstNumber == null) {
                    warn('Please pick a number before picking the operator')
                }
                else {
                    operator = buttonText
                    toDisplayOrNotToDisplay(buttonText, cla, false)
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
            writingFirstNumber = false
            writingSecondNumber = false
            decimalIsInNumber = false
            if (!(firstNumber == null) && !(secondNumber == null) && !(operator == null)) {
                firstNumber = operate(firstNumber, secondNumber, operator)
                display.textContent = firstNumber
            }
            else {
                warn('Please pick two numbers and an operator before proceding')
            } 
        }
        if (cla.includes('AC')) {
            writingFirstNumber = false
            writingSecondNumber = false
            decimalIsInNumber = false
            firstNumber = null
            secondNumber = null
            operator = null
            display.textContent = '0'
        }
        if (cla.includes('justC')) {
            writingFirstNumber = false
            writingSecondNumber = false
            decimalIsInNumber = false
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
            writingFirstNumber = false
            writingSecondNumber = false
            decimalIsInNumber = false
            display.textContent = display.textContent / 100 
            firstNumber = Math.round(display.textContent * 10000) / 10000
            display.textContent = firstNumber
            secondNumber = null
            operator = null
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
    answer = Math.round(answer * 10000) / 10000
    return answer
}
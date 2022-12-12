const buttons = document.querySelector('.buttons')
const display = document.getElementById('display')
let btns = document.querySelectorAll('button');

const calculator = {
    displayValue: '0',
    firstNumber: null,
    secondNumber: null,
    operator: null
}

let add = (a,b) => {
    return a+b
}

let substract = (a,b) => {
    return a-b
}

let multiply = (a,b) => {
    return a*b
}

let percent = (a,b) => {
    return (a/100)*b
}

let divide = (a,b) => {
    if(b!=0){
        return a/b
    }
    else{
        alert('Come on ! You know it is forbidden to divide by zero ! 😡')
        return
    }
}

let operate = (a, b, operator) => {
    switch (operator){
        case '+':
            return add(a,b)
            break
        case '-':
            return substract(a,b)
            break
        case '*':
            return multiply(a,b)
            break
        case '/':
            return divide(a,b)
            break
        case '%':
            return percent(a,b)
            break
        default:
            return b
    }
}

let updateDisplay = () => {
    display.textContent = calculator.displayValue
}

let decimalClick = (dot) => {
    if(calculator.secondNumber != null){
        calculator.displayValue = '0.'
        calculator.secondNumber = null
        return
    }
    if(!calculator.displayValue.includes(dot)){
        calculator.displayValue += dot
    } 
}

let clearClick = () => {
    calculator.displayValue = '0'
    calculator.firstNumber = null
    calculator.secondNumber = null
    calculator.operator = null
}

let deleteClick = () => {
    if(calculator.displayValue.length <=1){
        calculator.displayValue = '0'
    }
    else {
        calculator.displayValue = calculator.displayValue.slice(0, -1)
    }
}

let plusMin = () => {
    let displayPlusMin = calculator.displayValue
    if(displayPlusMin >= '0'){
        displayPlusMin = ''
        display.textContent = '-' + displayPlusMin 
    }
    calculator.displayValue = display.textContent
}

let userInput = (number) => {
    if(calculator.secondNumber != null){
        calculator.displayValue = number
        calculator.secondNumber = null
    }
    else{
        if(calculator.displayValue === '0'){
            calculator.displayValue = number
        }
        else{
            calculator.displayValue += number
        }
    }
}

let handleOperator = (operator) => {
    const input = parseFloat(calculator.displayValue)
    if(input.toString().length <= 5){
        if(calculator.operator && calculator.secondNumber != null){
            calculator.operator = operator
            return
        }
        if(calculator.firstNumber === null && !isNaN(input)){
            calculator.firstNumber = input
        }
        else if(calculator.operator){
            const res = operate(calculator.firstNumber, input, calculator.operator)
            calculator.displayValue = parseFloat(res.toFixed(3))
            calculator.firstNumber = parseFloat(res.toFixed(3))
        }
        calculator.secondNumber = 0
        calculator.operator = operator
    }
    else{
        alert("Sorry numbers of more than 5 digits are not allowed !")
        return
    }
}

buttons.addEventListener('click', (e) => {
    if (!e.target.matches('button')) {
        return
    }
    switch(e.target.value){
        case '%':
        case '+':
        case '-':
        case '/':
        case '*':
        case '=':
            handleOperator(e.target.value)
            break
        case '.':
            decimalClick(e.target.value)
            break
        case '+/-':
            plusMin()
            break
        case 'clear':
            clearClick()
            break
        case 'delete':
            deleteClick()
            break
        default:
            if(Number.isInteger(parseFloat(e.target.value))){
                userInput(e.target.value)
            }
        }
    updateDisplay()
})

document.addEventListener("keypress", (event) => {
    let key = ''
    if(event.code == 'Slash'){
        key = '+/-'
    }
    else{
        key = event.key
        switch(key){
            case 'Enter':
                key = '='
                break
            case 'Backspace':
                key = 'delete'
                break
            case 'Escape':
                key = 'clear'
                break
            case ',':
                key = '.'
                break
            default:
                key = key
        }
    }
    const keyPressed = document.querySelector(`button[value="${key}"]`)
    if (keyPressed) {
        document.addEventListener("keyup", function onKeyup() {
            document.removeEventListener("keyup", onKeyup);
            keyPressed.style.backgroundColor = "#faaca8c3";
        }, false);
        keyPressed.style.backgroundColor = "#4e3e82";
    }
    if(!keyPressed)  return  //Secure keyPressed for input errors that are not valid
    keyPressed.click()
})


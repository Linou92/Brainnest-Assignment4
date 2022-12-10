const buttons = document.querySelector('.buttons')
const display = document.getElementById('display')
let btns = document.querySelectorAll('button');

const Calculator = {
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
    display.textContent = Calculator.displayValue
}

let decimalClick = (dot) => {
    if(Calculator.secondNumber != null){
        Calculator.displayValue = '0.'
        Calculator.secondNumber = null
        return
    }
    if(!Calculator.displayValue.includes(dot)){
        Calculator.displayValue += dot
    } 
}

let clearClick = () => {
    Calculator.displayValue = '0'
    Calculator.firstNumber = null
    Calculator.secondNumber = null
    Calculator.operator = null
}

let deleteClick = () => {
    if(Calculator.displayValue.length <=1){
        Calculator.displayValue = '0'
    }
    else {
        Calculator.displayValue = Calculator.displayValue.slice(0, -1)
    }
}

let plusMin = () => {
    let displayPlusMin = Calculator.displayValue
    if(displayPlusMin >= '0'){
        displayPlusMin = ''
        display.textContent = '-' + displayPlusMin 
    }
    Calculator.displayValue = display.textContent
}

let userInput = (number) => {
    if(Calculator.secondNumber != null){
        Calculator.displayValue = number
        Calculator.secondNumber = null
    }
    else{
        if(Calculator.displayValue === '0'){
            Calculator.displayValue = number
        }
        else{
            Calculator.displayValue += number
        }
    }
}

let handleOperator = (operator) => {
    const input = parseFloat(Calculator.displayValue)
    if(input.toString().length <= 5){
        if(Calculator.operator && Calculator.secondNumber != null){
            Calculator.operator = operator
            return
        }
        if(Calculator.firstNumber === null && !isNaN(input)){
            Calculator.firstNumber = input
        }
        else if(Calculator.operator){
            const res = operate(Calculator.firstNumber, input, Calculator.operator)
            Calculator.displayValue = parseFloat(res.toFixed(3))
            Calculator.firstNumber = parseFloat(res.toFixed(3))
        }
        Calculator.secondNumber = 0
        Calculator.operator = operator
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
    const keyPressed = document.querySelector(`button[value="${key}"]`);
    if(!keyPressed) return //Secure keyPressed for input errors that are not valid
    keyPressed.click()
  })


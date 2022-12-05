let display = document.getElementById('display')
let buttons = Array.from(document.getElementsByClassName('button'))

buttons.map(button => {
    button.addEventListener('click', (e) => {
        switch(e.target.innerText){
            case 'C':
                display.innerText = ''
                break
            case '←':
                display.innerText = display.innerText.slice(0, -1)
                break
            case '=':
                try{
                    display.innerText = eval(display.innerText)
                    break
                } catch{
                    display.innerText = 'ERROR !'
                } 
            default:
                display.innerText += e.target.innerText
        }
    })
})

let add = (a,b) => {
    return a+b
}

let substract = (a,b) => {
    return a-b
}

let multiply = (a,b) => {
    return a*b
}

let divide = (a,b) => {
    return a/b
}

let operate = (operator, a, b) => {
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
    }
}
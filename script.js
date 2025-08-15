let display = document.getElementById('display');
let currentInput = '0';
let previousInput = '';
let operation = null;
let shouldResetScreen = false;

function updateDisplay() {
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function appendToDisplay(value) {
    if (shouldResetScreen) {
        currentInput = '0';
        shouldResetScreen = false;
    }
    
    if (value === '.' && currentInput.includes('.')) {
        return;
    }
    
    if (['+', '-', '*', '/'].includes(value)) {
        if (operation !== null && !shouldResetScreen) {
            calculate();
        }
        previousInput = currentInput;
        operation = value;
        shouldResetScreen = true;
        return;
    }
    
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    
    updateDisplay();
}

function calculate() {
    if (operation === null || previousInput === '') {
        return;
    }
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    operation = null;
    previousInput = '';
    shouldResetScreen = true;
    updateDisplay();
}

document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendToDisplay(event.key);
    } else if (event.key === '.') {
        appendToDisplay('.');
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        appendToDisplay(event.key);
    } else if (event.key === 'Enter' || event.key === '=') {
        calculate();
    } else if (event.key === 'Escape' || event.key === 'c' || event.key === 'C') {
        clearDisplay();
    } else if (event.key === 'Backspace') {
        deleteLast();
    }
});
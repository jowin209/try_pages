const buttons = document.querySelectorAll(".buttons");
const screen = document.getElementById("screen");

const values = {
    x : null,
    y : null,
    operation : null
}

const valid_operators = {
    "+" : "add",
    "-" : "subtract",
    "*" : "multiply",
    "/" : "divide"
}

// Signals if an operator button was just recently clicked
let IS_RECENT = false;

// Signals whether the equal sign has been pressed or not
let IS_EQUAL = false;

for (const button of buttons) {
    button.addEventListener('click', () => {
        const current_number = Number(screen.value);
        const button_pressed = button.innerText;

        if (!isNaN(button_pressed)){
            if (IS_EQUAL) {
                clear_memory();
            }
            append_number(button_pressed);
            IS_RECENT = false;
            IS_EQUAL = false;
        }
        else if (button_pressed === "CE") {
            clear_memory();
            screen.value = "";
            IS_RECENT = false;
            IS_EQUAL = false;
        }
        else if (button_pressed in valid_operators){
            const operator = valid_operators[button_pressed];
            values.operation = operator;

            use_operator(current_number);
            IS_RECENT = true;
            IS_EQUAL = false;
        } 
        else if (button_pressed === "=") {
            use_operator(current_number);
            IS_RECENT = true;
            IS_EQUAL = true;
        }
    })
}

document.addEventListener('keydown', (event) => {
    const current_number = Number(screen.value);
    const key_pressed = event.key;

    if (!isNaN(key_pressed)) {
        if (IS_EQUAL) {
            clear_memory();
        }
        else {
            append_number(key_pressed);
            IS_RECENT = false;
            IS_EQUAL = false;
        }
    }
    else if (key_pressed === "Backspace") {
        if (event.ctrlKey) {
            screen.value = "";
        }
        else {
            screen.value = String(screen.value).slice(0, -1);
        }
    } else if (event.ctrlKey && key_pressed.toLowerCase() === "c") {
        clear_memory();
        screen.value = "";
        IS_RECENT = false;
        IS_EQUAL = false;
    }
    else if (key_pressed in valid_operators) {
        const operator = valid_operators[key_pressed];
        values.operation = operator;

        use_operator(current_number);
        IS_RECENT = true;
        IS_EQUAL = false;
    }
    else if (key_pressed === "=" || key_pressed === "Enter") {
        use_operator(current_number);
        IS_RECENT = true;
        IS_EQUAL = true;
    }
})

// Remove later
const _debug = () => {
    console.log(`x: ${values.x}\ny: ${values.y}\noperator: ${values.operation}`)
}

const get_answer = () => {
    let answer;

    switch (values.operation) {
        case "add":
            answer = values.x + values.y;
            break;
        case "subtract":
            answer = values.x - values.y;
            break;
        case "multiply":
            answer = values.x * values.y;
            break;
        case "divide":
            answer = values.x / values.y;
            break;
        default:
            answer = NaN;
            alert("Invalid operation!");
    }

    return answer;
}

// Append number to the screen
const append_number = (key_input) => {
    if (IS_RECENT) {
        screen.value = "";
    }

    if (!isNaN(key_input)) {
        screen.value += key_input;
    }
}

// Clear the numbers on the screen
const clear_memory = () => {
    values.x = null;
    values.y = null;
    values.operation = null;
}

// Compute or add the operator on the computation
const use_operator = (number) => {
    number = Number(number);

    if (values.x === null) {
        values.x = number;
        screen.value = "";
    }
    else { 
        if (IS_RECENT) {
            screen.value = values.x;
            values.y = null;
        }
        else {
            values.y = number;
        }
    }
    

    if (values.x != null && values.y != null) {
        screen.value = get_answer();

        // Make the values reusable
        values.x = Number(screen.value);
    }
}
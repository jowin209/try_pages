const buttons = document.querySelectorAll(".buttons");
const screen = document.getElementById("screen");

const values = {
    x : null,
    y : null,
    operation : "add"
}

const valid_operators = {
    "+" : "add",
    "-" : "subtract",
    "*" : "multiply",
    "/" : "divide"
}

for (const button of buttons) {
    button.addEventListener('click', () => {
        const current_number = Number(screen.value);

        // Add all number input to be shown on the screen
        if (!isNaN(button.innerText)){
            screen.value += button.innerText;
        } 
        // Clear the values and the screen when 'CE' is clicked
        else if (button.innerText === "CE") {
            screen.value = "";
            values.x = null;
            values.y = null;
            values.operation = "add";
        } 
        // Check if the button clicked is a valid operator (+, -, *, /)
        else if (button.innerText in valid_operators){
            const operator = valid_operators[button.innerText];

            // TODO: Fix from here
            if (values.x === null && values.y === null) {
                values.x = current_number;
                values.operation = operator;
                screen.value = "";
            } else if (values.y === null) {
                values.y = current_number;
                values.operation = operator;
                screen.value = get_answer(current_number);
            } 
            _debug(button); // Remove later
        } 
    })
}

const _debug = (button) => {
    console.log(`x: ${values.x}\ny: ${values.y}\noperator: ${values.operation}`)
}

const get_answer = (current) => {
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

    return values.y;
}
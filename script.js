const buttons = document.querySelectorAll(".buttons");
const screen = document.getElementById("screen");

const values = {
    x : 0,
    y : 0,
    operation : "add"
}

const valid_operators = {
    "+" : "add",
    "-" : "subtract",
    "x" : "multiply",
    "/" : "divide"
}

for (const button of buttons) {
    button.addEventListener('click', () => {
        if (!isNaN(button.innerText)){
            screen.value += button.innerText;
        }
        else if (button.innerText === "CE") {
            screen.value = "";
        }
        else if (button.innerText in valid_operators){
            console.log(valid_operators);
        }
    } )
}

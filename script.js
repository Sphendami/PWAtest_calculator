if("seviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js");

}

let display = document.getElementById("display");

let formula = "0";
let preIsOperator = false;
let preIsEqual = false;


function clickNum(number) {
    if (preIsEqual) {
        display.value = number;
        formula = number;
    } else if (preIsOperator) {
        display.value = number;
        formula += number;
    } else if (display.value === "0") {
        display.value = number;
        if (formula === "0") {
            formula = number;
        } else {
            formula = formula.slice(0, -1) + number;
        }
    } else {
        display.value += number;
        formula += number;
    }

    preIsOperator = false;
    preIsEqual = false;

}

function clickDot() {
    if (display.value.includes(".")) return;

    display.value += ".";
    formula += ".";

    preIsOperator = false;
    preIsEqual = false;

}

function clickOpe(operator) {
    if (preIsOperator) {
        formula = formula.slice(0, -1);
    }
    let evaluation = eval(formula);
    formula = evaluation + operator;
    display.value = evaluation;

    preIsOperator = true;
    preIsEqual = false;

}

function clickEqual() {
    if (preIsOperator) {
        formula = formula.slice(0, -1);
    }
    let evaluation = eval(formula);
    formula = evaluation;
    display.value = evaluation;

    preIsEqual = true;
    preIsOperator = false;

}

function clickClear() {
    display.value = "0";
    formula = "0";

    preIsOperator = false;
    preIsEqual = false;

}



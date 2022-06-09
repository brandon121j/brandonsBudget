const prompt = require('prompt-sync')({ sigint: true });
const chalk = require('chalk');

// Usual monthly income: $4380

// If MHA turns to BAH $1971

// If MHA is cut in half $2700

const line = '-----------------------------------------------------------';

const smallLine = '---------------------------------';

const br = ' ';

const nanError = 'ERROR VALUE MUST BE A NUMBER';

let startingAmount = 4900;

let totalSum = 0;

let remainingAmount = 0;

// let expenses = {
//     Rent: 1000,
//     // Savings: 750,
//     Credit_Card: 1000,
//     // Groceries: 500,
//     Car: 250,
//     Electric: 110,
//     Car_Insurance: 120,
//     personal_loan: 50,
//     // Lawn_Service: 130,
//     Internet: 70,
//     Dental_Insurance: 45,
//     // Exterminator: 50,
//     Water: 25,
//     Trash: 25,
//     Renters_Insurance: 25,
//     Braces: 110,
//     // Amazon_Prime: 15,
// }

let expenses = {
    Rent: 1400,
    Credit_Card: 2500,
    Car: 300,
    Electric: 110,
    Car_Insurance: 120,
    personal_loan: 150,
    Internet: 70,
    Dental_Insurance: 45,
    Water: 45,
    Renters_Insurance: 25,
    Braces: 110,
}

let wishList = {
//     
}

const instructions = {
    1: 'Pay Rent',
    2: 'Put $500 in savings',
    3: 'Pay Car Loan',
    4: 'Pay Personal Loan',
    5: 'Pay Credit Card debt',
    6: 'Pay Water Bill',
    7: 'Pay Electric Bill',
    8: 'Pay Internet Bill',
    9: 'Pay Trash Bill'
}

const displayExpenses = () => {
    console.log(br)
    for (const iterator in expenses) {
        console.log(chalk.yellow(iterator) + ': ' + chalk.red('-$') + chalk.red(expenses[iterator]))
    }
    console.log(br);
    console.log(smallLine);
    console.log(br);
    console.log(chalk.yellow('Remaining Amount: ') + chalk.green('$' + remainingAmount))
    console.log(br);

    main();
}

function gettingPaidInstructions() {
    console.clear();
    for (i = 0; i < 5; i++) {
        console.log(br);
    }
    for (const loop in instructions) {
        console.log(chalk.yellow(loop) + ': ' + chalk.blue(instructions[loop]))
    }
    for (i = 0; i < 5; i++) {
        console.log(br);
    }

}

function expenseTotalUpdater() {
    totalSum = 0;
    for (const looper in expenses) {
        totalSum += parseInt(expenses[looper]);
    }
}

function totalUpdater() {
    expenseTotalUpdater();
    remainingAmount = parseInt(startingAmount) - parseInt(totalSum);
}

function addExpenses() {
    let expenseName = prompt('Enter Expense Name: ');
    let expenseValue = prompt('Enter Expense Value: -$ ');

    expenseValue == isNaN(expenseValue) ? console.log(nanError) : expenses[`${expenseName}`] = expenseValue;
    
    totalUpdater();
    displayExpenses();
    main();
}

function addMoney() {
    const moneyAmount = prompt('Enter value to add to available money: $');
    startingAmount += parseInt(moneyAmount);

    totalUpdater();
    displayExpenses();
}

function deleteExpense() {
    let allExpenses = Object.entries(expenses);
    console.table(allExpenses)

    console.log(expenses.indexOf('trash'))
}

const main = () => {
    console.log('Press [A] to add expense');
    console.log('Press [D] to display getting paid instructions');
    console.log('Press [F] to display expenses');
    console.log('Press [G] to add money');
    const input = prompt('');

    if (input === 'a' || input === 'A') {addExpenses()};
    if (input === 'd' || input === 'D') {gettingPaidInstructions()}
    if (input === 'f' || input === 'F') {displayExpenses()};
    if (input === 'g' || input === 'G') {addMoney();}
}

if (wishList.length !== 0) {
    for (let loops in wishList) {
        expenses[`${loops}`] = wishList[loops]
    }
}

totalUpdater();
main();

console.log(totalSum)

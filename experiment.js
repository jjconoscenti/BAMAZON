var inquirer = require('inquirer');
var colors = require('colors');
var mysql = require('mysql');

function menu(err, res) {
    if (err) {
        console.log(colors.red('Error found: ' + err));
    } else {
        inquirer.prompt([{
            name: 'customerSelection',
            type: 'list',
            message: 'Welcome to Bamazon, what would you like to do?',
            choices: ["View store items", "Shop", "View Cart"]
        }]).then(function(answer) {
            var waitMsg;

            switch (answer.customerSelection) {

                case "View Store Items":
                    console.log(colors.green("Here's what we have available"));
                    waitMsg = setTimeout(showInventory, 3000);
                    break;

                case "Shop":
                    console.log(colors.green("Shop tree"));
                    waitMsg = setTimeout(shopStore, 3000);
                    break;

                case "View Cart":
                    console.log(colors.green("Here's your cart"));
                    waitMsg = setTimeout(showCart, 3000);
            }
        })
    }
}

function showInventory();

function shopStore();

function showCart();
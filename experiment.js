var inquirer = require('inquirer');
var colors = require('colors');
var mysql = require('mysql');

// global functions
function showInventory() {
    console.log("Show inventory");
}

function shopStore() {
    console.log("Shop store");
}

function showCart() {
    console.log("Show cart");
}

function menu(err, res) {
    if (err) {
        console.log(colors.red('Error found: ' + err));
    } else {
        inquirer.prompt([{
            name: 'customerSelection',
            type: 'list',
            message: 'Welcome to Bamazon, what would you like to do?',
            choices: ["Shop", "View Cart", "Exit"]
        }]).then(function(answer) {
            var waitMsg;

            switch (answer.customerSelection) {

                // case "View Store Items":
                //     console.log(colors.green("View store items"));
                //     waitMsg = setTimeout(showInventory, 2000);
                //     break;

                case "Shop":
                    console.log(colors.green("============================="));
                    console.log(colors.white("Here's what we have available"));
                    console.log(colors.green("============================="));
                    console.log(colors.white("item1 id " + "|" + " item1 name " + "|" + " item1 price " + "|" + " item1 stockqty"));
                    console.log(colors.blue("item1 id " + "|" + " item1 name " + "|" + " item1 price " + "|" + " item1 stockqty"));
                    console.log(colors.white("item1 id " + "|" + " item1 name " + "|" + " item1 price " + "|" + " item1 stockqty"));
                    console.log(colors.blue("item1 id " + "|" + " item1 name " + "|" + " item1 price " + "|" + " item1 stockqty"));
                    console.log(colors.white("item1 id " + "|" + " item1 name " + "|" + " item1 price " + "|" + " item1 stockqty"));
                    console.log(colors.blue("item1 id " + "|" + " item1 name " + "|" + " item1 price " + "|" + " item1 stockqty"));
                    console.log(colors.white("item1 id " + "|" + " item1 name " + "|" + " item1 price " + "|" + " item1 stockqty"));
                    console.log(colors.blue("item1 id " + "|" + " item1 name " + "|" + " item1 price " + "|" + " item1 stockqty"));
                    console.log(colors.white("item1 id " + "|" + " item1 name " + "|" + " item1 price " + "|" + " item1 stockqty"));
                    console.log(colors.blue("item1 id " + "|" + " item1 name " + "|" + " item1 price " + "|" + " item1 stockqty"));
                    waitMsg = setTimeout(shopStore, 2000);
                    break;

                case "View Cart":
                    console.log(colors.green("Here's your cart"));
                    waitMsg = setTimeout(showCart, 2000);

                case 'Exit':
                    console.log(colors.yellow("Thanks for shopping with Bamazon!"));
                    break;
            }
        })
    }
}

menu()
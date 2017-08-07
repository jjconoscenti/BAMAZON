var inquirer = require('inquirer');
var colors = require('colors');
var mysql = require('mysql');

// create connection
var connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

// connection
connection.connect(function(err) {
    if (err) throw err;
    startApp();
})

// global variable
var customerCart = [];


// global functions
function showInventory() {
    var query = 'SELECT * FROM products';
    connection.query(query, function(err, res, fields) {
        if (err) throw err;
        console.log('\n');
        console.log('\n');
        console.log(colors.green("============================="));
        console.log(colors.white("Here's what we have available"));
        console.log(colors.green("============================="));
        for (var i = 0; i < res.length; i++) {
            console.log(colors.white(`=============================\nitem_id: ${res[i].item_id}\nproduct: ${res[i].product_name}\nprice: ${res[i].price}\n=============================\n`));
        }
    });
}

function shopStore() {
    console.log("Shop store");
}

function showCart() {
    console.log("Show cart");
}
// create a product
function createProduct() {
    var query = connection.query(
        'INSERT INTO products set ?', {
            product_name: 'Keurig Coffee Maker',
            department_name: 'Kitchen Appliances',
            price: 89.99,
            stock_quantity: 999
        },
        function(err, res) {
            console.log(res.affectedRows + 'product inserted');
        }
    )
}

// start the app
function startApp(err, res) {
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
                    waitMsg = setTimeout(shopStore, 2000);
                    break;

                case "View Cart":
                    console.log(colors.green("Here's your cart"));
                    waitMsg = setTimeout(showCart, 2000);
                    break;

                case 'Exit':
                    console.log(colors.yellow("Thanks for shopping with Bamazon!"));
                    process.exit();
            }
        })
    }
}

showInventory();
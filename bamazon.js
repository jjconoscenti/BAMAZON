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

// connect & start app
connection.connect(function(err) {
    if (err) throw err;
    startApp();
})

// global functions
function showInventory() {
    var query = 'SELECT * FROM products';
    connection.query(query, function(err, res, fields) {
        if (err) throw err;
        console.log('\n');
        console.log(colors.green("============================="));
        console.log(colors.white("Here's what we have available"));
        console.log(colors.green("============================="));
        console.log('\n');
        for (var i = 0; i < res.length; i++) {
            console.log(colors.white(`=============================\nPRODUCT: ${res[i].product_name}\nQUANTITY AVAILABLE: ${res[i].stock_quantity}\nPRICE: ${res[i].price}\n=============================\n`));
        }
    });
}

function shopStore() {
    showInventory();
    connection.query('SELECT * FROM products', function(err, res) {
        if (err) throw err;
        inquirer
            .prompt([{
                    name: "customerShopping",
                    type: "list",
                    choices: function() {
                        var availableProducts = [];
                        for (var i = 0; i < res.length; i++) {
                            availableProducts.push(res[i].product_name);
                        }
                        return availableProducts;
                    },
                    message: "What would you like to buy"
                },
                {
                    name: "purchaseQuantity",
                    type: "input",
                    message: "How many do you want to buy?"
                }
            ]).then(function(answer) {
                var customerCart;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].product_name === answer.choice) {
                        customerCart = res[i];
                    }
                }
                // parseInt to convert customer answer (string) as integer
                if (customerCart - parseInt(answer.purchaseQuantity) >= 0) {
                    connection.query(
                        'UPDATE products SET ? WHERE ?', [{
                                stock_quantity: customerCart.stock_quantity - parseInt(answer.purchaseQuantity)
                            },
                            {
                                item_id: customerCart.item_id
                            }
                        ],
                        function(res, err) {
                            if (err) throw err;
                            var cartTotal = customerCart.price * parseInt(answer.purchaseQuantity);
                            console.log(colors.grey(`Purchase complete! Here's your receipt:`));
                            console.log(colors.white(`QTY: ${answer.purchaseQuantity} x ${customerCart.product_name}`));
                            console.log(colors.green(`Total: ${cartTotal}`));
                            startApp();
                        }
                    );
                } else {
                    console.log(colors.red(`Oh no! We're out of stock on that item! Take a look around the shop for something else.`));
                    startApp();
                }
            })
    })
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
            choices: ["Shop", "Exit"]
        }]).then(function(answer) {
            var waitMsg;

            switch (answer.customerSelection) {

                case "Shop":
                    console.log(colors.green("Get ready to drop some dough!"));
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
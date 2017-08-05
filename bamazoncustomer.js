var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    root: 'root',
    password: 'root',
    database: 'bamazon'
});

connection.connect(function(err) {
    if (err) {
        console.log("Error: " + err);
    }
    // createProduct();
});

function createProduct() {
    var query = connection.query(
        'INSERT INTO products set ?', {
            product_name: 'shake weight',
            department_name: 'fitness',
            price: 19.99,
            stock_quantity: 999
        },
        function(err, res) {
            console.log(err);
            //     console.log(res.affectedRows + 'product inserted');
        }
    )
}


function findProducts(callback) {
    var query = connection.query(
        'SELECT * FROM products', callback)
}

// CUSTOMER INTERACTION

// (1/2) ask user the item of the id they want to buy

// (2/2) ask user how many units of the product they want to buy

function openMenu() {
    findProducts(displayProducts);
}

function displayProducts(err, res) {
    if (err) {
        console.log("Error found: " + err)
    } else {
        inquirer.prompt([{
            type: "list",
            message: "What's the ID of the product you want to buy?",
            choices: ""
        }])
        console.log(res);
    }
}


// VERIFY PURCHASE AGAINST CURRENT STOCK LEVELS

// function to check if the store has enough in stock for the customer to buy. If the store has enough, move forward w transaction and do the following:
// // fulfill the order
// // // update the SQL database to reflect the remaining quantity
// // // show the total cost of the purchase to the customer
// // //display "thank you" message
// // 

// // if the store does NOT have enough, do NOT move forward w transaction and display "error" message
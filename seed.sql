CREATE database bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (50) NOT NULL,
    department_name VARCHAR (50) NOT NULL,
    price INT (10,2) NOT NULL,
    stock_quantity INT (10),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Tesla Model X", "Cars", 89999.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Nike Killshot 2", "Shoes", 169.99, 50);
use bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (50) NOT NULL,
    department_name VARCHAR (50) NOT NULL,
    price INT (10,2) NOT NULL,
    stock_quantity INT (10),
    PRIMARY KEY (item_id)
);

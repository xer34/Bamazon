DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(

	id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50),
    department_name VARCHAR(20),
    price INTEGER(10),
    stock_quantity INTEGER(10),
    PRIMARY KEY (id)
    
    );
    
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mountain Dew", "Grocery", 5.0, 1000),
("Pepsi", "Grocery", 5.0, 1000),
("Wonder Bread", "Grocery", 2.5, 500),
("Samsung Galaxy S9", "Smartphones", 799.0, 3),
("Axe Body Spray", "Personal Care", 4.0, 8488),
("Old Game Cubes", "Electronics", 5.0, 1000),
("Chocolate Muffins", "Grocery", 2.0, 555),
("Apple Macbooks", "Electronics", 2999.0, 4),
("World of Warcraft", "Electronics", 55.0, 9999),
("Apple Airbuds", "Electronics", 199.0, 2);
    
    
    
CREATE DATABASE IF NOT EXISTS Bamazon;
USE Bamazon;

CREATE TABLE products (
item_id INT AUTO_INCREMENT,
PRIMARY KEY (id),
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price DECIMAL NOT NULL,
stock_quantity INT(30) NOT NULL
);

Select * FROM products;
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ("Pizza Bites", "Food", 7.00, 200),
		("Toilet Paper", "Toiletry", 10.00, 500),
		("Paper Towels", "Kitchen", 6.00, 300),
		("Tea Spoons", "Kitchen", 5.00, 100),
		("Printer Paper", "Office Supplies", 4.00, 800),
		("Mouse Pads", "Office Supplies", 2.00, 300),
		("Green Apples", "Grocery", 1.50, 200),
		("Bananas", "Grocery", 1.50, 200),
		("Oranges", "Grocery", 2.50, 250),
		("Mangoes", "Grocery", 3.00, 200);

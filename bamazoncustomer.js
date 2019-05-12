var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Pawel",
  database: "Bamazon"
});


connection.connect(function(err) {
    if (err) throw err;
    console.log("testing");
    console.log("connected as id " + connection.threadId);
    queryAllProducts();
});

function queryAllProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Product ID: " + res[i].item_id + " || " +
                "Product: " + res[i].product_name + " || " +
                "Department: " + res[i].department_name + " || " +
                "Price: " + "$" + res[i].price + " || " +
                "Stock Quantity: " + res[i].stock_quantity);
        }
        checkout();
    });
};

function checkout() {
    inquirer.prompt([
        {
            name: "id",
            type: "number",
            message: "Please enter the Product ID of the item that you would like to buy?"
        },
        {
            name: "quantity",
            type: "number",
            message: "How many would you like to buy?"
        },
    ])
    .then(function(answer) {
        var quantity = answer.quantity;
        var itemId = answer.id;
        connection.query("SELECT * FROM products WHERE id ? " + itemId, function (err, res) {
            if (err) throw err;
            if (res[0].stock_quantity - quantity >= 0) {
                console.log("Quantity in Stock: " + res[0].stock_quantity + "\nOrder Quantity: " + quantity);
                console.log("Your total is: " + (answer.quantity * res[0].price) + " dollars.");
                connection.query("UPDATE products SET stock_quantity ? WHERE id ?", [res[0].stock_quantity - quantity, itemId],
                function (err, res) {
                    if (err) throw err;
                    queryAllProducts();
                });
            }

            else {
                console.log("Insufficient quantity! \nCurrent quantity: " + res[0].stock_quantity + "\nPlease try again!");
                queryAllProducts();
            }
        });
    });
};

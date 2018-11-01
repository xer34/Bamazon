const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, data) {
    if (err) throw err;
    var table = new Table({
      head: ["#", "Item Name", "Department", "Price", "Quantity"],
      colWidths: [5, 25, 20, 10, 20]
    });

    for (let i = 0; i < data.length; i++) {
      table.push([
        data[i].id,
        data[i].product_name,
        data[i].department_name,
        data[i].price,
        data[i].stock_quantity
      ]);
    }

    console.log(table.toString());

    inquirer
      .prompt([
        // Here we create a basic text prompt.
        {
          type: "input",
          message:
            "Which product would you like to buy? Please enter item number.",
          name: "productID"
        },
        {
          type: "input",
          message: "How Many would you like?",
          name: "productAmount"
        }
      ])

      .then(function(inquirerResponse) {
        connection.query("SELECT * FROM products", function(err, data) {
          if (err) throw err;

          var amountInStock = data[(inquirerResponse.productID) - 1].stock_quantity;

          var amountToSell = inquirerResponse.productAmount;

          var price = data[(inquirerResponse.productID) - 1].price; 
          
          if (amountInStock > inquirerResponse.productAmount) {

            var sql =
              "UPDATE products SET stock_quantity = " +
              (amountInStock - amountToSell) +
              " WHERE stock_quantity = " +
              amountInStock;

            connection.query(sql, function(err, result) {
              if (err) throw err;
              connection.query("SELECT * FROM products", function(err, data) {
                if (err) throw err;
                
                var table = new Table({
                  head: ["#", "Item Name", "Department", "Price", "Quantity"],
                  colWidths: [5, 25, 20, 10, 20]
                });

                for (let i = 0; i < data.length; i++) {
                  table.push([
                    data[i].id,
                    data[i].product_name,
                    data[i].department_name,
                    data[i].price,
                    data[i].stock_quantity
                  ]);
                }

                console.log(table.toString());
                console.log("Amount in stock: " + amountInStock);
                console.log("Amount to sell: " + amountToSell);
                console.log("Theres enough in stock. Selling!");
                console.log(amountToSell + " sold");
                console.log((price * amountToSell) + " Dollarydoos has been deducted from your Bamazon Account")
              });

              connection.end();

            });

          } else {

            console.log("There isn't that amount in stock. Please try again!");
            afterConnection();

          }
        });
      });
  });
}

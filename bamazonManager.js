const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "bamazon"
});

operation();

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Please Select an Operation",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ],
        name: "operation"
      }
    ])
    .then(function(inquirerResponse) {
      var operation = inquirerResponse.operation;
      console.log(operation);
      switch (operation) {
        case "View Products for Sale":
          viewProduct();
          break;
        case "View Low Inventory":
          viewInventory();
          break;
        case "Add to Inventory":
          addInventory();
          break;
        case "Add New Product":
          addProduct();
          break;
      }
    });
}

function viewProduct() {
  console.log("connected as id " + connection.threadId);

  console.log("Loading Products for Sale");

  connection.connect(function(err) {
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
      connection.end();
    });
  });
}

function viewInventory() {
  console.log("connected as id " + connection.threadId);

  console.log("Loading Low Inventory Levels");

  connection.connect(function(err) {
    if (err) throw err;

    connection.query("SELECT * FROM products", function(err, data) {
      if (err) throw err;
      var table = new Table({
        head: ["#", "Item Name", "Department", "Price", "Quantity"],
        colWidths: [5, 25, 20, 10, 20]
      });

      for (let i = 0; i < data.length; i++) {
        if (data[i].stock_quantity < 5) {
          table.push([
            data[i].id,
            data[i].product_name,
            data[i].department_name,
            data[i].price,
            data[i].stock_quantity
          ]);
        }
      }

      console.log(table.toString());
      connection.end();
    });
  });
}

function addInventory() {
  console.log("Loading Inventory Restocking");

  inquirer
    .prompt([
      // Here we create a basic text prompt.
      {
        type: "input",
        message:
          "Which Item Would You Like To Restock? Please enter product ID",
        name: "productID"
      },
      {
        type: "input",
        message: "How many would you like to replenish?",
        name: "amountToReplenish"
      }
    ])
    .then(function(inquirerResponse) {
      connection.query("SELECT * FROM products", function(err, data) {
        if (err) throw err;

        var productID = data[inquirerResponse.productID - 1].id;
        console.log(productID);

        var restockAmount = inquirerResponse.amountToReplenish;
        console.log(restockAmount);

        var amountInStock = data[inquirerResponse.productID - 1].stock_quantity;

        var sql =
          "UPDATE products SET stock_quantity = " +
          (parseInt(amountInStock) + parseInt(restockAmount)) +
          " WHERE id = " +
          productID;

        connection.query(sql, function(err, result) {
          if (err) throw err;

          connection.query("SELECT * FROM products", function(err, data) {
            if (err) throw err;

            var table = new Table({
              head: ["#", "Item Name", "Department", "Price", "Quantity"],
              colWidths: [5, 25, 20, 10, 20]
            });

            table.push([
              data[inquirerResponse.productID - 1].id,
              data[inquirerResponse.productID - 1].product_name,
              data[inquirerResponse.productID - 1].department_name,
              data[inquirerResponse.productID].price,
              data[inquirerResponse.productID - 1].stock_quantity
            ]);

            console.log(table.toString());
            connection.end();
          });
        });
      });
    });
}

function addProduct() {
  console.log("Loading New Product Addition");

  inquirer
    .prompt([
      // Here we create a basic text prompt.
      {
        type: "input",
        message: "We're going to add a new product! What is the name of it?",
        name: "productName"
      },
      {
        type: "input",
        message: "What department is it going into?",
        name: "department"
      },
      {
        type: "input",
        message: "How much does it cost?",
        name: "price"
      },
      {
        type: "input",
        message: "How many would you like to stock?",
        name: "numToStock"
      }
    ])

    .then(function(inquirerResponse) {
      connection.query("SELECT * FROM products", function(err, data) {
        if (err) throw err;

        var productName = inquirerResponse.productName;

        var department = inquirerResponse.department;

        var price = inquirerResponse.price;

        var numToStock = inquirerResponse.numToStock;

        var sql =
          'INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("' +
          productName +
          '","' +
          department +
          '","' +
          price +
          '","' +
          numToStock +
          '");';

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
            connection.end();
          });
        });
      });
    });
}

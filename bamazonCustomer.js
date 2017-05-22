var inquirer = require("inquirer");
var mysql = require("mysql");

var stockQuantity = 0;
var userQuantity = 0;
var productID = 0;
var price = 0;


var connection = mysql.createConnection({

    host: "localhost",
    port: 3306,

    user: "root",
    password: "",

    database: "Bamazon"

});


connection.connect(function(error) {
    
    if (error) throw error;
    showAndAsk();

});

function showAndAsk () {

    connection.query("SELECT * FROM products", function(error, results){

        if(error) throw error;

        console.log("");

        for(i = 0; i < results.length; i++) {

            console.log("Item id: " + results[i].id + " | " + 
                        "Product: " + results[i].product_name + " | " + 
                        "DPT: " +results[i].department_name + " | " +
                        "Price: $" + results[i].price + " | " +
                        "Quantity: " + results[i].stock_quantity + " | " 
                        );

        }

        userInput();


    });

}

function userInput() {

    console.log("");

    inquirer.prompt([
        
        {
            message: "What is the product id # that you want to purchase?",
            name: "itemID",
            type: "input"
        }, 
        
        {   
            message: "How many would you like?",
            name: "quantity",
            type: "input"
        }
    
    ]).then(function(answers) {
        userQuantity = answers.quantity;

        connection.query("SELECT * FROM products", function(error, results) {

            if(error) throw error;


            for (i = 0; i < results.length; i++) {

                if(results[i].id == answers.itemID) {

                    if(userQuantity > results[i].stock_quantity) {

                        console.log("");
                        console.log("Insufficient quantity!");
                        console.log("");

                        showAndAsk();

                    } else {

                        console.log("");
                        console.log("You purchased: " + results[i].product_name);
                        console.log("processing order.....");

                        stockQuantity = results[i].stock_quantity;
                        productID = results[i].id;
                        price = results[i].price * userQuantity;

                        setTimeout(function() {

                            processOrder();

                        }, 2000)
                        
                    }

                } 

            }
   
        });

    });

}


function processOrder () {

        connection.query("UPDATE products SET ? WHERE ? ", [

            {
                stock_quantity: (stockQuantity - userQuantity)
            },
            {
                id: productID
            }


        ] , function(error, results) {
            if (error) throw error;
        });

        console.log("");
        console.log("Your order was successfully processed!");
        console.log("Thank you for shopping here!");
        console.log("Your total price: $" + price);
        console.log("");

        setTimeout(function() {
              showAndAsk();   
        }, 3000);


}
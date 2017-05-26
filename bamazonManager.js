var inquirer = require("inquirer");
var mysql = require("mysql");

var stockQuantity = 0;
var userAdded = 0;


var connection = mysql.createConnection({

    host: "localhost",
    port: 3306,

    user: "root",
    password: "",

    database: "Bamazon"

});

connection.connect(function(error) {
    
    if (error) throw error;
    init();
});

function init () {

    stockQuantity = 0;
    userAdded = 0;
    choiceId = 0;

    console.log("");

    inquirer.prompt(

        {
            message: "[?] Hello manager, what would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory",
                       "Add to Inventory", "Add New Products"],
            type: "list",
            name: "choice"

        }

    ).then(function(answer) {

        switch(answer.choice) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                find();
                break;
            case "Add New Products":
                newProducts();
                break;

        }

    });

}

function viewProducts () {

    console.log("");

    connection.query("SELECT * FROM products", function(error, results) {

        if (error) throw error;

        for(i = 0; i < results.length; i++) {

            console.log("Item id: " + results[i].id + " | " + 
                        "Product: " + results[i].product_name + " | " + 
                        "DPT: " +results[i].department_name + " | " +
                        "Price: $" + results[i].price + " | " +
                        "Quantity: " + results[i].stock_quantity + " | " 
                        );

        }

        init();


    });


}

function viewLowInventory() {

        connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(error, results) {

            if (error) throw error;

            if (results.length === 0) console.log("\nThere are no items that are below 5 in quantity.");

            for(i = 0; i < results.length; i++) {


                    console.log("Item id: " + results[i].id + " | " + 
                            "Product: " + results[i].product_name + " | " + 
                            "DPT: " +results[i].department_name + " | " +
                            "Price: $" + results[i].price + " | " +
                            "Quantity: " + results[i].stock_quantity + " | " 
                            );

                

            }

        init();

    });

}

function find() {

    console.log("");


    inquirer.prompt([

        {
            message: "What is the id # that you would like to add?",
            name: "item",
            type: "input"
        },
        {
            message: "How much would you like to add?",
            name: "quantityAdded",
            type: "input"
        }

    ]).then(function(answers) {

        userAdded = parseInt(answers.quantityAdded);        

        connection.query("SELECT * FROM products", function(error, results) {

            if (error) throw error;

            var choiceId = parseInt(answers.item);

            var stuff = JSON.parse(JSON.stringify(results));

            for(i = 0; i < results.length; i++) {

                if(choiceId == parseInt(JSON.stringify(stuff[i].id))) {
                
                    stockQuantity = stuff[i].stock_quantity;
                    add(choiceId);                              

                    }
            }
    });        
      

    });




}

function add(id) {

        connection.query("UPDATE products SET ? WHERE ?", [

            {
                
                stock_quantity: (stockQuantity + userAdded)
            },

            {
                id: id
            }

        ], function(error, results){

            setTimeout(function(){

                console.log("\nYour request has been successfully fulfilled.");
                 init();

            }, 2000);
            
        });

       
  
}

function newProducts () {

    console.log("");

    inquirer.prompt([

        {
            message: "What is the product name?",
            type: "input",
            name: "name",
        },
        {
            message: "What department will it be in?",
            type: "input",
            name: "department"
        },
        {
            message: "What is the price?",
            type: "input",
            name: "price"
        },
        {
            message: "How many will you order?",
            type: "input",
            name: "quantity"
        }


    ]).then(function(answer){

        connection.query("INSERT INTO products SET ?", {

            product_name: answer.name,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.quantity

        }, function(error, results) {});

        setTimeout(function(){

                console.log("\nYou have successfully added another product.");
                 init();

            }, 2000);

    });

}

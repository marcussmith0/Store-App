# Store-App

These apps tracks the inventory of a store, and allows the user to buy and/or replenish stock. 

## Dependencies

* mysql
* inquirier

## How to Use

You can run this app by typing `node bamazonCustomer.js` or `node bamazonManger.js`

### bamazonCustomer.js

When you run this command the terminal will display a list of the items in the store:

![screenshot 8](https://cloud.githubusercontent.com/assets/22058682/26470587/decaf15e-4163-11e7-927f-860dec969f44.png)

You will be prompted to input the id number of the item you want to purchase.

After you input your desired product's id, you will be asked how much of the product you want to order.

If the quantity you request is higher than the amount the store has than you will be notified that we do not have sufficient quantity. If we do have sufficient quantity, then the application will take a few seconds to process your order, and then tell you how much you paid and bring you back to to beginning.

![screenshot 19](https://cloud.githubusercontent.com/assets/22058682/26474416/a1219fc0-4176-11e7-9021-e1becd543fb3.png)

### bamazonManager.js

When you run this command the terminal display a list of four command that you can choose as manager of the store. `View Products for Sale`, `View Low Inventory`, `Add to Inventory`, and `Add New Products`.

#### View Products for Sale

If you select this choice, a list of all the product that are available in the store will be display, along with the id number, department, price, quantity available.

![screenshot 21](https://cloud.githubusercontent.com/assets/22058682/26474738/732c73cc-4178-11e7-9767-c347ddf7d0fe.png)

#### View Low Inventory

When you run this command only the products that have a quantity that is less than 5.

If all products are greater than 5 then `"You have no low inventory"` will print to the screen.

![screenshot 22](https://cloud.githubusercontent.com/assets/22058682/26480700/5c465424-41a1-11e7-8204-41253fb383b2.png)

### Add to Inventory

This lets you increase the stock quantity of a product that already exists in the store. 
First you will be prompted to select the id number of the product that you want to add to. 
Then you will type in the amount that you want to order.

![screenshot 23](https://cloud.githubusercontent.com/assets/22058682/26480910/f7085790-41a2-11e7-8a39-25ead7afd10c.png)

### Add New Products

When you select this command, you will be prompted to give several inputs. At the end of it you will have added a new product.

![screenshot 25](https://cloud.githubusercontent.com/assets/22058682/26481069/16540e22-41a4-11e7-8240-a431764b331b.png)

then you can select `View Products for Sale` to see it:

![screenshot 25](https://cloud.githubusercontent.com/assets/22058682/26481174/c9835b1a-41a4-11e7-8351-ec0c1476186b.png)


That's pretty much it. <br>
Thank you.


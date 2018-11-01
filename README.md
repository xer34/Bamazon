# Bamazon

Hello, and welcome to Bad Amazon, or Bamazon for short

# Customer View

Wanna buy some stuff? Bamazon makes it easy. Just select the item from the list of junk you want and it'll automatically deducut legal Austrailian currency from your Bamazon account.

First, it will ask you what you want to buy, then, how many. Our quantaties are updated on the fly! Your business is important to us!

![alt text](customerBUY1.png)
![alt text](customerBUY2.png)

# Manager View

Welcome Bamazon managers! Your paycheck is in the mail! We Promise! Here are some features available to you.

    * View Products for Sale

Here you can view your current inventory for sale!

![alt text](managerforsale.jpg)
  
    * View Low Inventory

Here you can see if inventory for any of your items is below 5!
  
![alt text](managerlowinv.jpg)

Here you can add to your inventory until it is at a sufficient level!

    * Add to Inventory

![alt text](manageraddinv.jpg)
  
Here you can add a new product if you so desire!

  * Add New Product

![alt text](managerproduct1.png)
![alt text](managerproduct2.png)

#Supervisor View

1. Create a new MySQL table called `departments`. Your table should include the following columns:

   - department_id

   - department_name

   - over_head_costs (A dummy number you set for each department)

2. Modify the products table so that there's a product_sales column, and modify your `bamazonCustomer.js` app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

   - Make sure your app still updates the inventory listed in the `products` column.

3. Create another Node app called `bamazonSupervisor.js`. Running this application will list a set of menu options:

   - View Product Sales by Department

   - Create New Department

4. When a supervisor selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

| department_id | department_name | over_head_costs | product_sales | total_profit |
| ------------- | --------------- | --------------- | ------------- | ------------ |
| 01            | Electronics     | 10000           | 20000         | 10000        |
| 02            | Clothing        | 60000           | 100000        | 40000        |

5. The `total_profit` column should be calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` should not be stored in any database. You should use a custom alias.

6. If you can't get the table to display properly after a few hours, then feel free to go back and just add `total_profit` to the `departments` table.

   - Hint: You may need to look into aliases in MySQL.

   - Hint: You may need to look into GROUP BYs.

   - Hint: You may need to look into JOINS.

   - **HINT**: There may be an NPM package that can log the table to the console. What's is it? Good question :)

### Reminder: Submission on BCS

- Please submit the link to the Github Repository!

---

### Minimum Requirements

Attempt to complete homework assignment as described in instructions. If unable to complete certain portions, please pseudocode these portions to describe what remains to be completed. Adding a README.md as well as adding this homework to your portfolio are required as well and more information can be found below.

---

### Create a README.md

Add a `README.md` to your repository describing the project. Here are some resources for creating your `README.md`. Here are some resources to help you along the way:

- [About READMEs](https://help.github.com/articles/about-readmes/)

- [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)

---

### Add To Your Portfolio

After completing the homework please add the piece to your portfolio. Make sure to add a link to your updated portfolio in the comments section of your homework so the TAs can easily ensure you completed this step when they are grading the assignment. To receive an 'A' on any assignment, you must link to it from your portfolio.

---

### One More Thing

If you have any questions about this project or the material we have covered, please post them in the community channels in slack so that your fellow developers can help you! If you're still having trouble, you can come to office hours for assistance from your instructor and TAs.

**Good Luck!**

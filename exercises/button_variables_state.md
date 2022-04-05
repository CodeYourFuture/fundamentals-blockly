

## Variables


Suppose we have a value that represents the number of times a button is clicked. Every time a user clicks on some button then this value increases by 1. We will often want to refer to this value to check its current value and do certain things based on its value. 

A variable is a label for some value. There are several reasons for which we might want to do this. The first is when we want to keep track of a value that changes over time. Let's keep track of the number of times a button is clicked.


We'll start with a button (`<button>`) that has been clicked 0 times in the static html.

1. Add an `at the start` block. Inside we are going to add a variable that will keep track of the number of times the button was clicked.

2. In the Variables menu, click `create variable...` to create a variable called `click_count`

3. From the Variables menu, create a `set click_count to` block and place it inside the `at the start`

4. Set the value to 0 (from the Values menu)

When the button is clicked, we are going to do two things: increase the value of `click_count` by 1; and change the text of the button to the new value of `click_count`.

5. dd an `when the element with id ... is clicked` block. 

6. Inside this block, add a `change click_count by 1` block from the Variables menu.

7. Add the necessary blocks to set the text content of the button to the value of `click_count`. (You can get this value by selecting the `click_count` block from the Variables menu)

A common pattern will be first setting a variable in the `at the start` block and then modify it in at `when the element with id ... is clicked` block. This first setting of the variable is called "initialisation".
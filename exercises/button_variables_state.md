## Variables


Suppose we have a value that represents the number of times a user clicks on a given button. Every time a user clicks on this button then this value increases by 1. We need to refer to this value so we can check it and update it. 

We can give this value a label like `click_count` and refer to `click_count` when we need to get the number of clicks. In programming, we call this label a variable. 

ℹ️ A variable is a label for some value.

Above we created a `click_count` variable. The `click_count` variable is a label we can use to refer to the current number of clicks. 

We'll start with a button (`<button>`) that a user has clicked 0 times, in the static html.

1. Add an `at the start` block. Inside we are going to add a variable that will keep track of the number of times a user clicks on the button.

2. In the Variables menu, click `create variable...` to create a variable called `click_count`

3. From the Variables menu, create a `set click_count to` block and place it inside the `at the start`

4. Set the value to 0 (from the Values menu)

When a user clicks on the button, we are going to do two things: 
- increase the value of `click_count` by 1
- and change the text of the button to the new value of `click_count`.HTML

5. Add a `when the element with id ... is clicked` block. 

6. Inside this block, add a `change click_count by 1` block from the Variables menu.

7. Add the necessary blocks to set the text content of the button to the value of `click_count`. (You can get this value by selecting the `click_count` block from the Variables menu)

A common pattern will be first setting a variable in the `at the start` block and then modifying with a `when the element with id ... is clicked` block. We call the first setting of the variable "initialisation".
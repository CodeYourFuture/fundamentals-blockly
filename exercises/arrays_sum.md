## Don't go higher than 11!

We are now going to use all the array blocks we have learned about. We're going to create a game where you roll dice and your goal is to get a total below 11.

We're going to start with an empty list (where we will display our rolls), a place to put a total, and a few buttons, as below:

```html
<p>So far you have rolled:</p>
<ul id="list"></ul>
<button id="button_roll">Roll the dice</button>
<p>Total: <span id="total">0</span>. <span id="info">Keep playing!</span></p>
<button id="button_remove">Remove the last roll</button>
<button id="button_restart">Start again</button>
```

### Game requirements

In this section, we're going to define all the requirements of the game. Before you start writing your program, think about about the following questions:

- How would you break down and implement these requirements into steps ?
- Think through which steps need to happen after each button click. In what order would you implement these steps so as to test each step as early as possible ?


1. When "roll the dice" is clicked, a new random number between 1 and 6 should be generated and added to t
2. If the total of all the dice rolls is exactly 11, display "You won" in the `<span id="info">`
3. If the total of all the dice rolls is over 11, display "You lost" in the `<span id="info">`
4. When "remove the last roll" is clicked, we should undo the last roll (this is a cheat button so that we can always win!)
5. The list should display all the rolls so far
6. The total so far should be displayed in the `<span id="total">`
7. When "start again" is clicked, we should return to the initial state


The following steps are needed. Notice that some of them repeat, some of them are similar, and that the game has a "state" which is the array of dice rolls. 

### Detailed steps


In this section, we detail what we need to implement for each requirement.

#### At the beginning

1. Display each roll in the array (there are currently no rolls)
2. Display the total of all rolls (it is currently 0)

#### When "roll the dice" is clicked 

1. Pick a random number between 1 and 6
2. Add that number to the array of rolls
3. Display each roll in the array
4. Calculate the total of all rolls
  - If it is greater than 11, display "You lost" 
  - If it is equal to 11, display "You won"
5. Display the total of all rolls

#### When "Start again" is clicked: (this is the same as at the beginning)

1. Display each roll in the array (there are currently no rolls)
2. Display the total of all rolls (it is currently 0)

#### When "Remove the last roll" is clicked

1. Remove the last roll from the array of rolls
2. Display each roll in the array
3. Calculate the total of all rolls
  - If it is greater than 11, display "You lost"
  - If it is equal to 11, display "You won"
  - If it is less than 11, display "Keep playing"
4. Display the total of all rolls

### Writing our program

In order to check that anything is working, we need to be able to display an array of rolls and its total, so that's where we will start.

#### Displaying the dice rolls

1. In an `At the start` block, create an array called `rolls` and put 3 numbers in the array (afterwards we will start with an empty array, but for now having numbers helps)
2. Using a loop, display each of the numbers in the array in the list. Check that your code works.
3. Set the `<span id="total">` to the sum of the numbers in the `rolls` array.

We will put in the "you won"/"you lost"/"keep playing" logic in last (but you could also do it now if you like)

Next, let's go with the simplest: the restart button 

4. Add a `When the element with id ... is clicked` block for this button
5. We want to set the `rolls` variable to an empty list (Use the same blocks as you did to initialise the rolls variable, then use the gear icon to remove all the items from the array)
6. We now want to remove the displayed rolls from the list (You will need to use the `Remove the contents of the element` block)
7. And we want to set the text in the `<span id="total">` to 0

#### Implementing roll the dice

Slightly more tricky: implementing the "roll the dice" button. Before following the instructions, can you think how we could create a dice ?

To create a dice,

1. We'll create a new array in the `At the start` block, called "dice" (be careful to select the `array` variable, not the `rolls` variable before renaming to `dice`), setting the values as the numbers 1, 2, 3, 4, 5, and 6. We can select a random item from this array when we want to roll a dice.
2. Add a <span class="blockname">"When the element with id ... is clicked"</span> block for the button

Let's roll the dice and add the result to the list.
3. Use the `add ... to the start/end of the array` block, setting the "end" of the "rolls" array, and using a `get random item from the array` block as the value.

We could now add a new `<li>` to the list and set the total. Instead, we are going to re-display the whole list from the array - you will see why in the next step.

4. To re-display the whole list (and set the total), we need a combination of the two previous steps: find the list, remove its contents, loop over the items in the array and add them to the list, set the total to the sum of the array.

#### Refactoring our program with functions

Notice that at this point, we have 3 different versions of the same steps to display the list contents and total. Now imagine we want to change something (like add the "you won"/"you lost"/"keep playing" information). We would have to add it in 3 different places! (And we still have a "remove last roll" button to implement - so it would be 4 places)

We can actually write this code so that is exactly the same all the times (looping over an empty array will do nothing, and it's sum will be 0). When we see a piece of code we would like to use multiple times, we create a function.

1. From the Functions menu, select a <span class="blockname">"To <i>do something</i>"</span> block and change it "to <i>display the rolls</i>"
2. Take all the display code you wrote in the previous step and move it inside this function.
3. In the Functions menu, there is now a `display the rolls` block. You can us it as a replacement for the code you just moved. That block will "call" the function you created (this means it will execute all the blocks inside that function)You can replace the 2 other versions of your display code with the `display the rolls` block.
4. Now you can add the logic that decides what to put into the `<span id="info">`.

Hint: You can calculate the sum of the array only once and store the result in a variable.
Hint: You can add else if and else conditions to the `if` block by clicking on the gear icon.

To test all the logic, put different values into the initial rolls array. Once this is working, you can set the initial rolls array to an empty list.

Last it's time to create our "cheat" functionality, the "Remove the last roll" button.

You already know how to do remove the first item from an array. You can use the same block to remove the last item

Don't forget to call the `display the rolls` function!

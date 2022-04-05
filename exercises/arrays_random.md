##  Arrays: Mad lib revisited

In the first Mad Libs exercise, we were unable to make our own list of words. We could only pick a category (noun, adjective, verb).
We will now introduce a data structure called an **array**. An array represents a list of data, often numbers or text.

We can create and use arrays with the "Arrays" menu. Let's create our own list of words to select from.

We'll start with a Mad Libs sentence like before:

```html
<p>The <u id="noun">man</u> <u id="verb">saw</u> the <u id="adjective">white</u> <u id="animal">cat</u></p>
```

1. Add an `at the start` block

We'll now create an array of animals and assign it to a variable.

2. From the "Arrays" menu, add a `Set ... to, create array with` block to the `at the start` block

3. Rename the variable `array` to `animals`.

Note, that we can use a variable to store any value. In previous exercises, we stored a number. Here we are storing an array, but otherwise, it's exactly the same concept.

4. Add at least 3 animal text values to this array

Note: You can click on the gear icon at the top left of the `create array with` block to add and remove slots for values.

Now let's set the text of `<u id="animal">` to a random animal.
You already know how to do most of the steps (find the element with id animal, set its text content).
The thing we will do differently is to set the text content to a `get a random item from array` block. You can then select the "animals" array in the dropdown.

5. Click "run" several times to check you get a random animal from your array each time. 

6. Try creating more arrays from which to select random words to fill each slot. Share your results with your cohort.
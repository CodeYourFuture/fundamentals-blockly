## Adding, removing, and summing elements

We are now going to learn how to add items to, remove items from, and get the sum of, an array of numbers. We're going to keep a running total of the last five numbers. (This can be a way of keeping track of how a value trends over time. For example, the last 5 times you weighed yourself, or the last 5 times you went running).

Start with an input box, a button to add numbers, and a span to display the total.

```html
<p>Total of the last 5 numbers: <span id="total"></span> </p>
<input id="number" />
<button id="add_number">add value</button>
```

Let's start with an array of elements and show their sum.

1. In an `at the start` block, create a new array called `numbers` with 5 items, all set to the value 0

2. Find the span with id "total" and set its text content to the sum of the numbers array. You'll need to use the `get the sum of the numbers in array` block for this step.

Now, we'll take the number in the input element, add it to the array and display the sum again when a user clicks the button.
You already know how to get the value from the input element when a user clicks on it. Let's add that value to the numbers array. 

3. From the arrays menu, use the `add ... to the start/end of the array` block, selecting "end", and setting the value to the value of the input element.

4. You can now display the sum of the array again, reusing your logic from the previous steps.

5. Test that this works (and note, that it displays the full sum of the array, not the last 5 numbers).

Last, we need to remove the first (oldest) element from the array. 

6. From the arrays menu take a `get the first item from the array` block.

7. Change the dropdown from "get" to "remove", to remove the first item

Where do you need to place this removal so that there are only ever 5 numbers in the list when we calculate the sum?
Test that this works and that the sum is only ever that of the last 5 numbers.
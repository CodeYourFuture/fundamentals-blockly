## Arrays and loops


In this series of exercises, we have so far used one `create a new ... element` for each `<li>` we want to create.

Another use for an array is when we want to do the same thing with each element in an array (for example, create an `<li>`).

Start with an empty unordered html list with the id "list"

```html
<ul id="list"></ul>
```
in the static html.

#### Part 1

1. Add an `at the start` block.

We'll now create an array of fruits and assign it to a variable.

2. From the "Arrays" menu, add a `Set ... to, create array with` block to the `at the start` block

3. Rename the variable `array` to `fruits`

4. Add at least 3 fruit text values to this array.

#### Part 2

Let's do the first steps to convert the first item in this array into an `<li>`.
You already know how to do most of the steps (find the element with id list, create an li, set its text content.)

1. The thing we will do differently is to set the text content to a `get the first item from the array block`. You can then select the "fruits" array in the dropdown.

2. <span class="test-checkbox"></span> Click "run" to check you are displaying a list with one fruit.

#### Part 3

Let's use the same code to show all the fruits.

1. At the beginning of the `find the element with id` block, insert a `for each item in array` block. Select the fruits array in the dropdown.

2. Move all of the `create a new ... element` block inside the for `for each item in array` block

3. <span class="test-checkbox"></span> As you can see by clicking "run", you now have a list with multiple items - but they are all the first item in the array

ℹ️ Inside the loop, you have a variable available called `item`. In each stage of the loop, this variable will take on the value of the next fruit in the array.

4. Replace the `get the first item from the array` block with a "item" variable block (you can find it in the Variables menu).

5. <span class="test-checkbox"></span>Check by clicking run that you now have a list with each item of fruit in your array.

6. If you have an array called `fruits`, it's good practice to rename the loop `item` variable to `fruit`.

7. <span class="test-checkbox"></span> Add another fruit to your array and check that all your fruits are still shown.
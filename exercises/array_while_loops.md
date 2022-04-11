## Loops and arrays: more fun with fruit

In this exercise, we'll use an alternative way of looping through all the items of an array. Let's see a case where it might be useful.

#### Part 1

We'll start with an empty unordered html list with the id "list" in the static html:

```html
<ul id="list"></ul>
```

1. As before, create an array called `fruits` of your favourite fruit inside an `at the start` block.

We're going to use this array of `fruits` to build a HTML list.

Instead of the `for each item in array` block, we will use the `repeat while` block and the `... is empty` block together

2. Add a `find the element with id` block to find the html list.

3. Add a `repeat while` block from the Loops menu inside the previous block and change it to be `repeat until`. (We are going to keep `get and remove`ing items from the array _until_ it's empty.)

4. Set the condition value to `... is empty`.

5. Inside the loop, add the blocks to create a new `<li>` and set the contents to a `get and remove the first item from the array` block, using the "fruits" array.

6. <span class="test-checkbox"></span>Check that all your fruit are now displaying.

#### Part 2

Next, let's have each `<li>` contain two things. The name and the emoji of the fruit.

We can only set the text contents of an element once. However, we can add multiple elements inside the same `<li>`. In html, the `<span>` element is typically used for such a purpose, because it doesn't add any extra meaning or formatting to the text (unlike others which say "this is a list item" or "this is a link")

1. Add two `create a new ... element` blocks, selecting `<span>`. Set the first's content to the `get and remove the first item from the array`.

2. For now, let's set the second to 🍎 (you can copy paste this into a text block. More can be found [here](https://unicode-table.com/en/emoji/food-and-drink/food-fruit/))

3. <span class="test-checkbox"></span> Check that all your fruit are now displaying with a 🍎 next to them

#### Part 3

Finally, let's show the right emoji next to each fruit.

(Before doing this, make sure you have renamed your first array of fruits to `fruits`)

1. Create a second array which will be called `emojis` and will contain each of your emojis (🍎, 🍌, 🍒)

2. Replace the 🍎 block inside your loop with the appropriate `get and remove the first item from the array` block.

3. <span class="test-checkbox"></span> Check that all your fruit are now displaying with the right emoji next to them
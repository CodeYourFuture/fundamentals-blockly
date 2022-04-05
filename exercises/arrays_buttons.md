## Arrays and buttons

One of the most common things we do with an array is  to sloop through all the items, performing a task each time. Sometimes, a loop just doesn't do what we need, for example if we wanted to make the list of fruit appear gradually.

We'll start with an empty unordered html list (as usual) and a `reveal next fruit` button:

```html
<ul id="list"></ul>
<button id="button">reveal next fruit</button>
```

#### Part 1

1. Create an array of your favourite fruit inside an `at the start` block.


#### Part 2


We'll now make it so each click of the button reveals the next fruit.

1. <span class="test-checkbox"></span> Add a `when the element with id ... is clicked` block. Make it add an `<li>` with the text "fruit" for now (and check it works).

2. As we did at the start of the previous exercise, we can use the `get the first item from the array` block instead of the "fruit" text (your fruits array is accessible from inside the `when the element with id ... is clicked` block). Now each time you click the button, a new `<li>` with the name of the first fruit will appear.

3. <span class="test-checkbox"></span> Change `get the first item` to `get and remove the first item`. This will remove the first item from the array, so that the new first item is the old second item: if it was previously `["apple", "banana", "cherry"]`, it is now `["banana", "cherry"]`.


#### Part 3

As you can see, after all of the elements in the array have been removed, new `<li>`s with the text "undefined" are created. Let's fix that!

1. We want the behaviour to be different once the array is empty. So we use an `if` block from the Logic menu.
We can check if an array is empty by using the `... is empty` block.

2. In fact, we only want to add the `<li>` element if the array is _not_ empty. So we can add a `not` block in front of the `... is empty` block.

3. <span class="test-checkbox"></span> Now we can move our `<li>` creating blocks inside the `if` block. In the other case (when the list is empty) we want to do nothing. And that's exactly what will happen.
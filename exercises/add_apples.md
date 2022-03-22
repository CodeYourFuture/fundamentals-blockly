
## A button to add apples


JavaScript is often "event-driven". This means some code runs when a user interacts with the page (clicking, typing, etc). 
We're going to write a program with the following functionality:
Every time a user clicks on the `add an apple` button, an apple will be added to the list.


1. Start with an empty unordered html list and a button to add apples to the list in the static html, as below:
                
```html
<ul id="list"></ul>
<button id="button">add an apple</button>
```

When we click on the `add an apple` button, let's add an apple to the list. 

2. Add a `when the element with id ... is clicked` block (it doesn't need to be connected to any other blocks)

3. Inside this block, add the blocks necessary to find the `list` element, create a new `li` element and set the content to "apple" (you know how to do this from previous exercises).

<span class="test-checkbox"></span>Can you add a second button (in the static html, with a different id) that removes all the apples (you can do this by using the `remove the contents of the element` block).              

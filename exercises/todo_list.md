## Todo list 
 
Now we're going to create a list of things to do.
        
We'll start with an empty list, an input, and an `add Todo Item` button in the static html:

```html
<p>Things to do:</p>
<ul id="list"></ul>
<input id="text" />
<button id="button">add Todo Item</button>
```

When a user clicks on the button, the program is going to do two things:

1. Get the value of the input box
2. Add a new `<li>` element with that value to the list. 

As with the previous exercise, we're going to start by programming the visible thing first. 

1. Add a `when the element with id ... is clicked` block.

2. First find the list element ( id: `list` ) and add a new `<li>` with your own text value ( for example, "do cyf homework" ). Check that this works.

3. Now, instead of adding an  `<li>` element with your own text value, we'll use the value from the input. Use the `get the ... value of <input> with id ...` block to add an `<li>` element with the value from the input box.

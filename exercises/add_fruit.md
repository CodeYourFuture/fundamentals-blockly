## Adding fruit


Not only can we update existing html elements, we can also create new ones and set their text and properties.
      
Let's start with an html list with a single apple in the static html 
                
- Note the list has an id `list` so that we can refer to it in our program.</li>
For example:

```html
<ul id="list">
  <li>Apple</li>
</ul>
```

Let's add one more fruit to the list:

1. Add an `at the start` block
2. Inside this block, add a `find the element with id` block using the id for the ul element `list`
3. Inside this block, add a `create a new ... element` block and select `<li>`
4. Inside this block, add a `set the text content` block and set the value to "Banana"
5. <span class="test-checkbox"></span> Click `run` to check the output looks like

```html
<ul id="list">
  <li>Apple</li>
  <li>Banana</li>
</ul>
```
<span class="test-checkbox"></span>Repeat the process above to add two more of your favourite fruit (hint: you can add multiple `create a new ... element` blocks one after the other)
    
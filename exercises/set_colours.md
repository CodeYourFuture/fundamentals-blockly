## Setting colours

You may want to study the following example to prepare for this exercise.
- <a href="../examples.html#example_changing_attribute" target=_blank>Changing or setting attributes</a>

---

We've seen how to change the text content of html elements, but we can also change the colour (and other attributes) of elements. Different kinds of **Values blocks** provide ways of setting texts, numbers and colours.

Let's start with an html list of our favourite fruit in the html section.

1.  each html list item (`<li>`) has a different id attribute so that we can refer to it using a css selector

For example:

```html
<ul>
  <li id="banana">Banana</li>
  <li id="apple">Apple</li>
  <li id="strawberry">Strawberry</li>
</ul>
```

2.  Click `run` to see the rendered output

You can also [inspect the html](https://developer.chrome.com/docs/devtools/dom/) you've generated using dev tools ( assuming you're using a Chrome broswer ). 

Let's change the banana element's colour to yellow

3.  Add an `at the start` block

4.  Inside this block, add a `find the element with id` block using the id `<li>` element for Banana (`banana`)

5.  Inside this block, add a `set the attribute` block. Select the _attribute_ "color" from the dropdown.

6.  <span class="test-checkbox"></span>You can find a color picker block in the `Values` menu and set its colour to yellow. Add the yellow colour block to the previous `set the attribute` block, to set the colour to yellow.

At this point, go back to [dev tools](https://developer.chrome.com/docs/devtools/dom/) and inspect the html again to observe the changes to the styling.

The colour for a banana is probably not easy to see against a white background.

7. <span class="test-checkbox"></span>Add a second `set the attribute` block and set a dark color for the background.

8. Click "run" to check the output looks like
<ul style="background-color: azure;">
      <li style="color:rgb(233, 233, 22);background-color: darkgrey;">Banana</li>
      <li>Orange</li>
</ul>

<span class="test-checkbox"></span>Repeat the process above to colour each of the fruit. ( Hint: you can add multiple `find the element with id` blocks one after the other )

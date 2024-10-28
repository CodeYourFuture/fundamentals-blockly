## Removing Contents

This example shows how to remove the contents of an element.

### The block
- **`remove the content of the element`**
  - Remove **all child elements** and **text content** of the selected element.
    
### What does this blockly program do?

To the first list (`<ol id="list1">`), the block removes all `<li>` elements from the list.
Because the list has became empty, we cannot see the list in the emulated browser window.

To the second list (`<ol id="list2"`), the block first removes all `<li>` elements, and then
appends a new `<li>` element to it. 

If we add a new `<li>` element to the second list without clearing its contents first, the new
`<li>` element will become the second `<li>` element in the list. (Go ahead and try this out in this example)

### Conceptual View ###
The blockly program changes
```
<ol id="list1">
  <li>Original item 1</li>
</ol>

<ol id="list2">
  <li>Original item 2</li>
</ol>
```
to
```
<ol id="list1"></ol>

<ol id="list2">
  <li>New item</li>
</ol>
```

The conversion is done "internally in the program". You won't see the converted HTML code, but you can see the changes in the rendered view.


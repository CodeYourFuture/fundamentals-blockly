## Changing Attributes

This example shows how to add or change attributes of an element.

### The block
- **`set the attribute [<attribute_name>] to {<attribute_value>}`**
  - Set or change the named attribute of the selected element to the specified value.
    
### What does the code block in this example do?

The block selects an element, and then set its `color` and `background` attributes.

For an attribute value that is a color, we can use a <i>color picker block</i> to pick a color, or 
specify a valid color value as a string.

### Conceptual View ###
The code block changes
```
<span id="message">Hello!</span>
```
to
```
<span id="message" color="#ffcc00" background="blue">Hello!</span>
```

The conversion is done "internally in the program". You won't see the converted HTML code, but you can see the changes in the the rendered view.


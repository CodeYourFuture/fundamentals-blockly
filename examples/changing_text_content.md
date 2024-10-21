## Changing Text Content

This example introduces the **Html blocks** to find an element, and then change the text content of the element.

### The blocks
- **`at the start (when run is clicked)`**
  - A container of blocks to be executed once when the "RUN" button is clicked.

- **`find the element with id [word2]`**
  - Find an element with the attribute `id="word2"`. In this example, it will find the second `<p>` element.
  - The found element will become the "selected element" inside the block.

- **`set the text content to "Hello"`**
  - Set the text content of the selected element to `Hello`.

### What does the code block in this example do?
The code block converts the static HTML from
```
<p id="word1">First word</p>
<p id="word2">Second word</p>
```
to
```
<p id="word1">First word</p>
<p id="word2">Hello</p>
```

The conversion is done "internally in the program". You won't see the converted HTML code, but you can see the changes in the the rendered view.


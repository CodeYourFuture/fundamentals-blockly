## Changing Text Content

This example introduces the **HTML blocks** to find an element, and then change the text content of the element.

### The blocks
- **`at the start (when run is clicked)`**
  - The blocks enclosed by this block are executed once
    when the "RUN" button is clicked.

- **`find the element with id [word2]`**
  - It finds an element with the attribute `id="word2"`. In this example, it will find the second `<p>` element.
  - The found element becomes the "selected element" inside the block.

- **`set the text content to "Hello"`**
  - It sets the text content of the selected element to `Hello`.

### What do the code blocks in this example do?
Conceptually, the code blocks convert the static HTML from
```
<p id="word1">First word</p>
<p id="word2">Second word</p>
```
to
```
<p id="word1">First word</p>
<p id="word2">Hello</p>
```

The conversion is done "internally in the program". You won't see the converted HTML code, but you can see the changes in the rendered view.


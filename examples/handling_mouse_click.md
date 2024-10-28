## Handing Mouse Click

This example demonstrates how to specify code blocks that execute only when the user clicks an element.

### The blocks
- **`when the element with id [<id value>] is clicked`**
  - The blocks enclosed by this block are executed only
    when the element with the specified `id` attribute is clicked.
    
- **`get a random [word]`**
  - This fun block generates a random word. 
  - We can also specify the generated word to be a verb, noun, or adjective.
  - Note: This block has nothing to do with handling mouse click.

### What does this blockly program do?

Whenever the first button (`<button id="adjButton">`) is clicked, the text inside 
`<span id="adj">` is replaced by a random adjective.

Whenever the second button (`<button id="nounButton">`) is clicked, the text inside 
`<span id="noun">` is replaced by a random noun.
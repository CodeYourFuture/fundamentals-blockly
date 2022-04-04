
## Button consolidation

Anything that we could do previously as soon as run is clicked, we can now do as a response to clicking buttons or other elements in the static html.

In earlier exercises, we started by writing our blockly program. We can click the run button to execute our program so it updates the rendered html. We can also write blockly programs that will run in response to a user clicking a button.


1. <span class="test-checkbox"></span>We're going to take the sentence from the first exercise in the static html, but this time with `<button>` elements around the words to be filled in:

```html
<p>The <button id="noun1">dog</button>
<button id="verb">saw</button> the 
<button id="adjective">white</button> 
<button id="noun2">cat</button></p>
```

Make it so each button's text gets set to a random word when it is clicked

2. <span class="test-checkbox"></span>Place two buttons (`day mode and "night mode") and an html list in the static html. Can you add blocks so that when the buttons are clicked, the html list changes to "day mode" (dark text on a light background) and "night mode" (light text on a dark background)?

3. <span class="test-checkbox"></span>Place a button in the static html. Can you add blocks so it changes colour when it is clicked?

4. <span class="test-checkbox"></span>Place an image in the static html. Can you add blocks so it changes when it is clicked
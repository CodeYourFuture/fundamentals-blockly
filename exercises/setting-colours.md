
## Setting colours


We've seen how to change the text content of html elements, but we can also change the colour of elements.  Different kinds of **Values blocks** provide ways of setting texts, numbers and colours.

Let's start with an html list of our favourite fruit in the "html" section.

1.  each html list item (`<li>`) has a different id attribute so that we can refer to it using a css selector

For example: `<ul>
        <li id="banana">Banana</li>  
        <li id="apple">Apple</li>  
        <li id="strawberry">Strawberry</li>  
        </ul>`

2.  Click "run" to see the rendered output

Let's change the banana element's colour to yellow
    
3.  Add an "at the start" block

4.  Inside this block, add a "find the element using css selector" block using the id selector for the <li> element for Banana (`#banana`)

5.  Inside this block, add a "set the attribute" block. Use this block to select the _attribute_ "color"

6. You can find a color picker block in the "Values" menu and set its colour to yellow. Add the yellow colour block to the previous "set the attribute" block, to set the colour to yellow. 

The colour for a banana is probably not easy to see against a white background.

7. Add a second "set the attribute" block and set a dark color for the background.

8.  Click "run" to check the output looks like
        - Banana
        - Orange

9.  Repeat the process above to colour each of the fruit. 
❓ ( Hint: you can add multiple "find the element using css selector" blocks one after the other )

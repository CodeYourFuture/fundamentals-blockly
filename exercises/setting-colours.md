
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

5.  Inside this block, add a "set the attribute" block, pick "color" and set the value to any yellow colour using the colour picker (you can find a color picker block in the "Values" menu).

6.  The colour for a banana is probably not easy to see against a white background. Add a second "set the attribute" block and set a dark color for the background.

7.  Click "run" to check the output looks like
        - Banana
        - Orange

8.  Repeat the process above to colour each of the fruit (hint: you can add multiple "find the element using css selector" blocks one after the other). You can also change the background color if you like
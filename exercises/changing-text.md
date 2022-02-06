# Changing text

This exercise introduces **Html blocks** to find and modify the text of html elements.

Let's start with the html below in the html area. It represents a sentence with gaps (also known as [Mad Libs](https://en.wikipedia.org/wiki/Mad_Libs)). An example of a mad lib sentence would be the following:

>  The dog saw the ___ cat

We can write this sentence with html so that it can be rendered into a web page.

1. Check out the text area, where should see the following html:
`<p>The <u id="noun1">dog</u> <u id="verb">saw</u> the <u id="adjective">___</u> <u id="noun2">cat</u></p>`
This html represents the mad libs sentence we first saw above.

2.  Click the "run" button to see the html rendered in the web page. 

Let's modify the contents of the first `<u>` element to contain the word "mouse" instead of "dog".

3.  Go to the html blocks and from there add an "at the start" block
    
4.  Inside this block, add a "find the element using css selector" block using the css selector for the id of the first <u> element
    
5.  Inside this block, add a "set the text content to" block and set the text content to be `mouse`

6.  Click "run" to check the content has changed.


## Extra exercises

1.  Can you modify the contents of the other three `<u>` elements? If you can't think of some words, you can use the "get a random word" block from the Values menu
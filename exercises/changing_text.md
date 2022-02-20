## Changing text

This exercise introduces the **Html blocks** you can use to find and update the text of html elements.

Let's start with the html below in the html area. It represents a sentence with gaps (also known as [Mad Libs](https://en.wikipedia.org/wiki/Mad_Libs). 

An example of a mad lib sentence would be the following:

  >  The dog saw the ___ cat

We can write this sentence with html and render it into a web page.

1. Check out the text area, where you should see the following html:

```html
<p>The <u id="noun1">dog</u> <u id="verb">saw</u> the <u id="adjective">___</u> <u id="noun2">cat</u></p>
```

This html represents the mad libs sentence we first saw above.
Click the "run" button to see the html rendered in the web page. 

Let's update the contents of the adjective `<u>` element to contain an adjective to describe the cat.

2.  Go to the html blocks and from there add an `at the start` block
      
3.  Inside this block, add a `find the element with id` block using the css selector for the id of the adjective `<u>` element
      
4.  Inside this block, add a `set the text content to` block 

5. Set the value of the text in this element to pink ( or any other colour you like )

6.  Click "run" to check the text content has changed.


## Extra exercises

1.  Can you update the contents of the other three `<u>` elements? If you can't think of some words, you can use the "get a random word" block from the Values menu
This exercise introduces the **Html blocks** to find and update the text of html elements.

1.  Let's start with the html below in the static html area. It represents a sentence with holes (also known as [Mad Libs](https://en.wikipedia.org/wiki/Mad_Libs)).

```html
  <p>The <u id="noun1">dog</u> <u id="verb">saw</u> the <u id="adjective">white</u> <u id="noun2">cat</u></p>
```


You can click "run" to see the output

2.  Let's replace the contents of the first `<u>` element to contain the word "mouse" instead of "dog".

    1.  Add an `"at the start"` block

    2.  Inside this block, add a `"find the element with id"` block using the id of the first `<u>` element (`noun1`)

    3.  Inside this block, add a `"set the text content to"` block

    4.  Set the value for the text of this block: `mouse`

    5.  Click `"run"` to check the content has changed.

3.  Can you update the contents of the other three `<u>` elements? If you can't think of some words, you can use the `"get a random word"` block from the Values menu
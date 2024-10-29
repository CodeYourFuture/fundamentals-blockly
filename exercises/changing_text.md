## Changing text

### Preparation ###
You may want to study the following example to prepare for this exercise.
- <a href="../examples.html#example_changing_text_content" target=_blank>Changing text content</a>

---

This exercise introduces the **Html blocks** you can use to find and update the text of html elements.

Let's start with the sentence below.

> The dog saw the \_\_\_ cat

This is an example of a **mad lib sentence**.

A **mad lib sentence** is a sentence with gaps that you can fill in to form new sentences.
It's taken from the popular [Mad Libs game](https://en.wikipedia.org/wiki/Mad_Libs).

Check out the text area, where you should see the following html:

```html
<p>
  The <u id="noun1">dog</u> <u id="verb">saw</u> the <u id="adjective">___</u>
  <u id="noun2">cat</u>
</p>
```

This html represents the mad libs sentence we first saw above. Click the "run" button to see the html rendered in the web page.

Let's update the contents of the adjective `<u>` element to contain an adjective to describe the cat.

1.  Go to the html blocks and from there add an `at the start` block.
2.  Inside this block, add a `find the element with id` block using the id of the adjective `<u>` element.
3.  Inside this block, add a `set the text content to` block.
4.  Set the value of the text in this element to be any adjective, for example "big", "small", "scary", "angry" etc.
5.  <span class="test-checkbox"></span>Click run to check the text content has changed.

## Change the other texts

1. <span class="test-checkbox"></span>Can you update the contents of the other three &lt;u&gt; elements? If you can't think of some words, you can use the <code>get a random word</code> block from the Values menu

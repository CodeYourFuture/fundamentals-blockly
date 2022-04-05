##  Arrays: Mad lib revisited

When we did the first Mad Libs exercise, we weren't able to make our own list of words to choose from but could only pick a category (noun, adjective, verb).

We will now introduce a data structure called an **array**, that represents a list of data (typically numbers or texts).

They can be created and used from the "Arrays" menu. Let's create our own list of words to select from.

Start with a Mad Libs sentence similar to before <code class="start_code">&lt;p&gt;The &lt;u id="noun"&gt;man&lt;/u&gt; &lt;u id="verb"&gt;saw&lt;/u&gt; the &lt;u id="adjective"&gt;white&lt;/u&gt; &lt;u id="animal"&gt;cat&lt;/u&gt;&lt;/p&gt;</code>

```html
<p>The <u id="noun">man</u> <u id="verb">saw</u> the <u id="adjective">white</u> <u id="animal">cat</u></p>
```

1. Add an `at the start` block

We'll now create an array of animals and assign it to a variable.

2. From the "Arrays" menu, add a `Set ... to, create array with` block to the `at the start` block

3. Rename the variable <span class="variablename">"array"</span> to "animals"

Note, a variable can be used to store any value. In previous exercises, we stored a number. Here we are storing an array, but otherwise it's exactly the same concept.

4. Add at least 3 animal text values to this array

Note: You can click on the gear icon at the top left of the `create array with` block to add and remove slots for values.

Now let's set the text of the `<u id="animal">` to a random animal.
You already know how to do most of the steps (find the element with id animal, set its text content)
The thing we will do differently is to set the text content to a `get a random item from array` block, selecting the "animals" array in the dropdown.

5. Click "run" several times to check you get a random animal from your array each time.

6. Create additional arrays from which to select random words for each slot to be filled and share the result with your cohort.
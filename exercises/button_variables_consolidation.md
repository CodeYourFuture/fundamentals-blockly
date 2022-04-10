## Variables consolidation


Let's use variables to keep track of information about some user interactions. We would like to track how many times the user adds the word "sheep" and how many times they add any other word.

Let's start with the following static html:

```html
<p>There have been <span id="sheep_count">0</span> sheep 🐑 and <span id="other_count">0</span> others.</p>
<input id="text" />
<button id="button">add animal</button>
```

You should remember to:
- use variables to keep track of values
- use blocks you need from the Logic menu

Don't forget to break down your implementation into steps. First, add blocks that make a visible difference and then test that it works.

1. When the user clicks `add animal`, the following should happen. If the text input is "sheep", the number displayed in the `<span id="sheep_count">` should increase by one.

2. When the user clicks `add animal` and the text input is not "sheep", then the following should happen: the number displayed in the `<span id="other_count">` should increase by one.
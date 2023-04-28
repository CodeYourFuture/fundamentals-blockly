
## Say something

We can get user input whenever a user clicks a button.
In this exercise, we'll get the browser to say a word or sentence that the user enters, when the user clicks a button.

Start with a text input box and a button with text content "speak" in the static html.
For example: 

```html
<input id="text" />
<button id="button">speak</button>
```

When a user clicks the button, we want to do two things in a particular order:

- First we get the value entered by the user
- We then need to pass this value to a block that will say it out loud.

🧠 A common problem solving strategy is to solve the visible (or in this case, audible) thing first. In this case, we can get the browser to say something first.
  
1. Add a `when the element with id ... is clicked` block.

2. Inside this block, add a `say` block from the Values menu.

3. As input to this block, connect a `get a random word` block.
Check that a random word gets said when you click `speak`
 
Now that a word gets said out loud when we click the button, we can make it say the word entered in the input box. 

4. Replace the `get a random word` block with a `get the ... value of <input> with id ...` block, using the input's id

Check that whatever word you write in the input box gets said when you click `speak`.
Do you see why it was useful to solve this problem in reverse order?
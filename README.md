# Deploy

Copy the whole folder to netlify - the entry point is index.html and all js is "packaged" manually through script tags (this needs improving upon)

# Run locally

Load index.html from a live server (also needs improving upon)

# Principles

- let students write all their own code -> they feel greater ownership
- indexing into arrays (and tracking variables with indexes, and for loops) is a complexity to be avoided at this stage -> everything is with push, pop and forEach
- referring to "arrays" (rather than "lists" recommended by blockly), to avoid the confusion of lists vs html lists.
- Scaffolding that fades :
  - pressing run
  - which specific blocks to use and where to find them
  - detailed step by step (only for introducing new blocks/concepts)
- problem solving. Some exercises deliberately look into iterative coding, rather than coding everything at once
  - Lists of links
  - Arrays and html lists
  - ... fill in here
- Static html vs creation with blocks - main reasoning is that adding event listeners is cleaner against elements in there from the start (otherwise you get very deep embedding)
- Generated code: it's readable and at some point it's worth taking a look at it (and definitely worth revisiting during JS1 or JS2)

# Notes

- It may be useful to inform students/trainees that block-based programming is "real" programming and they will graduate out of it and learn javascript syntax after the fundamentals module
- Some missing functionality is a bit arbitrary
  - no string concat
  - records (could use arrays within arrays rather than multiple arrays)
- "At the start" does nothing except act as a container
- "sum" is a really important block, because it justifies storing values in arrays as opposed to displaying them directly (as there aren't any blocks for mathematical operations)

# Design patterns for implementing projects

- Arrays should ideally be simply iterated over (no access by index)
- Problems that might be solved by accessing/tracking an index can be solved with two arrays acting as stacks and a "current value"
- Using CSS and setting the class for a given html element is a useful (and usual) way to achieve many style changes at once
- There deliberately is only a "remove all children" block -> Prefer removing all children and then regenerating them all based on a list, rather than trying to individually add/remove pieces of DOM

# Troubleshooting

- Nothing is displaying -> are you selecting an element with the correct id/css selector?
- Nothing is displaying -> are the names of your array variables all correct?
- The same thing is happening every time (related to a list or other variable) -> are you initialising in "at the start"?

# Contributing exercises

Some conventions are set up to interact with the app, to facilitate testing and markup of block names and starting html.

## Naming

By convention (not currently necessary, but possibly useful in future):

- exercises are named exercise_XXXXX
- md file for exercise_XXXX are in exercises/XXXX.md
- introduction is an exception

## Referring to blocks

All blocks should have consistent names and be marked up consistently (for easy renaming, or improved rendering), using either

```html
<span class="blockname">"at the start"</span> block
```

in html or

```markdown
"`at the start`" block
```

in markdown.

## Providing initial html

Each exercise includes its default/starting html. It should be either marked as

```html
<code class="start_code"
  >&lt;p&gt;The &lt;u id="noun1"&gt;dog&lt;/u&gt; &lt;u
  id="verb"&gt;saw&lt;/u&gt; the &lt;u id="adjective"&gt;white&lt;/u&gt; &lt;u
  id="noun2"&gt;cat&lt;/u&gt;&lt;/p&gt;</code
>
```

in html or be the first html code block in markdown:

```html
<ul>
  <li id="banana">Banana</li>
  <li id="apple">Apple</li>
  <li id="strawberry">Strawberry</li>
</ul>
```

## Placeholder for placing a pass/fail testmark for a test

In html, write the id of the test ("<exercise_id><expect_index>") in the corresponding li element classname

```html
<li id="exercise_set_colours_3">
  <!-- linked to BlocklyTest.registerTest("exercise_set_colours") ... BlocklyTest.expect(3)-->
</li>
```

In markdown, write an empty html span out. BlocklyTest.expect will be lined up by order of appearance

```html
<span class="test-checkbox"></span>
```

## Registering tests

The test for an exercise is registered

- once per exercise
- inside the html for that exercise
- by calling `BlocklyTest.registerTest` with the id attribute for the exercise and a callback to setup expectations

The callback is executed when the run button has been pressed, after the html has been rendered, but before the code is executed. It sets up expectations of the things that should happen after the code is executed.

`BlocklyTest.expect` has

- a numeric attribute (should be 1..n in order of where the checkboxes appear in the instructions)
- a text describing what should be true for the test to succeed
- a dom element whose changes are to be observed
- a predicate to be executed every time the dom element changes, to verify if the result is now true

`BlocklyTest.expectAfterClick` has

- same 1st 2 attributes
- a dom element for which we would like to observe what happens before and after it is clicked
- a value supplier that supplies an observed value
- a predicate that accepts the value supplied before click handlers are executed and after click handlers are executed, in order to compare the before and after
  git

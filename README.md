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

# Troubleshooting

- Nothing is displaying -> are you selecting an element with the correct id/css selector?
- Nothing is displaying -> are the names of your array variables all correct?
- The same thing is happening every time (related to a list or other variable) -> are you initialising in "at the start"?

# Contributing exercises

All blocks should have consistent names and be marked up consistently (for easy renaming, or improved rendering), using either

```html
<span class="blockname">"at the start"</span> block
```

in html or

```markdown
"`at the start`" block
```

in markdown.

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

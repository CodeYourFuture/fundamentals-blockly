## Adding Child Element

This example introduces how to create a new element and add it inside another element.

### The block
- **`create a new [<element_name>] element`**
  - It creates an element inside the selected element.
    
### What does this blockly program do?

The program adds two `<li>` elements inside a `<ul>` element.

When creating a new element, we can immediately set its attributes and text content.

We can also add another element inside a newly created element.
In this example, the program adds an `<a>` element inside the second `<li>` element.


### Conceptual View
The blockly program changes
```
<ul id="mylist"></ul>
```
to
```
<ul id="mylist">
<li>Apple</li>
<li><a href="https://blocks.codeyourfuture.io/">CYF Blocks</a></li>
</ul>
```

The conversion is done "internally in the program". You won't see the converted HTML code, but you can see the changes in the rendered view.


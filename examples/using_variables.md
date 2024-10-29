## Using Variables

This example demonstrates how to 
- use a variable, and 
- read a numerical value from an `<input>` element.

### Creating variables

A ***variable*** is a storage location with a **name**. By referencing a variable's name
in the program, we can change or use the data stored in the variable.

Before we can use a variable, we have to create the variable. 

To create a variable, click _`Create variable...`_ in the **`Variables`** category, 
and give a name to the variable.

### The blocks
- **`set [<variable name>] to {<value>}`**
  - It assigns a value to the named variable.
  
- **`get the [numerical] value of input with id [<id value>]`** 
  - It gets the numerical value from an `<input>` element identified by the
    attribute `id="<id value>"`.

  **Note**: If we need an input value for arithmetic calculation, we have to select `numerical` 
  instead of `text`.
      
- **`change [<variable name>] by {value}`**
  - It increases the value of the named variable by the specified value.

### What does this blockly program do?

Whenever the SUM button is clicked, the program
- gets the numerical values in the `<input>` elements, and store them in
  variables **`num1`** and **`num2`**, and
- increases the value of **`num1`** by the value of **`num2`** 
  (to calculate **`num1`** + **`num2`**), and
- shows the calculated sum in `<span id="sum">`.

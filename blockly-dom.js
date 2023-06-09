/* jshint esversion: 6 */

// customised messages
Blockly.Msg["CONTROLS_FOREACH_TITLE"] = "for each item %1 in array %2";

Blockly.Msg["LISTS_CREATE_EMPTY_TITLE"] = "create empty array";
Blockly.Msg["LISTS_CREATE_EMPTY_TOOLTIP"] =
  "Returns an array, of length 0, containing no data records";
Blockly.Msg["LISTS_CREATE_WITH_CONTAINER_TITLE_ADD"] = "array";
Blockly.Msg["LISTS_CREATE_WITH_CONTAINER_TOOLTIP"] =
  "Add, remove, or reorder sections to reconfigure this array block.";
Blockly.Msg["LISTS_CREATE_WITH_INPUT_WITH"] = "create array with";
Blockly.Msg["LISTS_CREATE_WITH_ITEM_TOOLTIP"] = "Add an item to the array.";
Blockly.Msg["LISTS_CREATE_WITH_TOOLTIP"] =
  "Create an array with any number of items.";

// copied from Blockly.Generator.prototype.statementToCode (but doesn't add indentation)
Blockly.JavaScript.statementToCodeNoIndent = function (block, name) {
  var targetBlock = block.getInputTargetBlock(name);
  var code = this.blockToCode(targetBlock);
  // Value blocks must return code and order of operations info.
  // Statement blocks must only return code.
  if (typeof code != "string") {
    throw TypeError(
      "Expecting code from statement block: " +
        (targetBlock && targetBlock.type)
    );
  }
  return code;
};

Blockly.JavaScript.getWithContextVariable = function () {
  if (!(this.contextVariableStack && this.contextVariableStack[0])) {
    return "";
  }
  return this.contextVariableStack[0];
};

Blockly.JavaScript.pushWithContextVariable = function (variableName) {
  this.contextVariableStack = this.contextVariableStack || [];
  this.contextVariableStack.unshift(variableName);
};

Blockly.JavaScript.popWithContextVariable = function () {
  if (!(this.contextVariableStack && this.contextVariableStack[0])) {
    return "";
  }
  return this.contextVariableStack.shift();
};

Blockly.Blocks["arrays_getFirst"] = {
  /**
   * Block for getting element at index.
   * @this {Blockly.Block}
   */
  init: function () {
    var MODE = [
      [Blockly.Msg["LISTS_GET_INDEX_GET"], "GET"],
      [Blockly.Msg["LISTS_GET_INDEX_GET_REMOVE"], "GET_REMOVE"],
      [Blockly.Msg["LISTS_GET_INDEX_REMOVE"], "REMOVE"],
    ];
    var WHERE_OPTIONS = [
      [Blockly.Msg["LISTS_GET_INDEX_FIRST"], "FIRST"],
      [Blockly.Msg["LISTS_GET_INDEX_LAST"], "LAST"],
    ];
    this.setStyle("list_blocks");

    var modeMenu = new Blockly.FieldDropdown(MODE, function (value) {
      var isStatement = value == "REMOVE";
      this.getSourceBlock().updateStatement_(isStatement);
    });
    this.appendDummyInput()
      .appendField("", "SPACE")
      .appendField(modeMenu, "MODE");

    var atMenu = new Blockly.FieldDropdown(WHERE_OPTIONS);
    this.appendDummyInput().appendField("the").appendField(atMenu, "WHERE");
    this.appendValueInput("VALUE")
      .setCheck("Array")
      .appendField("item from the array");

    this.setInputsInline(true);
    this.setOutput(true);
  },

  /**
   * Returns the state of this block as a JSON serializable object.
   * @return {{isStatement: boolean}} Whether the block is a statment, otherwise null.
   */
  saveExtraState: function () {
    if (!this.outputConnection) {
      return {
        isStatement: true,
      };
    }
    return null;
  },
  /**
   * Applies the given state to this block.
   * @param {*} state The state to apply to this block, ie whether it's a statement.
   */
  loadExtraState: function (state) {
    if (state["isStatement"]) {
      this.updateStatement_(true);
    }
  },

  /**
   * Switch between a value block and a statement block.
   * @param {boolean} newStatement True if the block should be a statement.
   *     False if the block should be a value.
   * @private
   * @this {Blockly.Block}
   */
  updateStatement_: function (newStatement) {
    var oldStatement = !this.outputConnection;
    if (newStatement != oldStatement) {
      this.unplug(true, true);
      if (newStatement) {
        this.setOutput(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
      } else {
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setOutput(true);
      }
    }
  },
};

WITH_CONTEXTS = [
  "add_element",
  "with_element_by_id",
  "with_element_by_selector",
  "with_elements_by_selector",
  "element_clicked",
];

function validateInWithContext(_e) {
  if (!this.workspace.isDragging || this.workspace.isDragging()) {
    return; // Don't change state at the start of a drag.
  }
  var legal = false;
  // Is the block nested in a procedure?
  var block = this.getSurroundParent();
  while (block) {
    if (WITH_CONTEXTS.indexOf(block.type) != -1) {
      legal = true;
      break;
    }
    block = block.getSurroundParent();
  }
  if (legal) {
    this.setWarningText(null);
    if (!this.isInFlyout) {
      this.setEnabled(true);
    }
  } else {
    this.setWarningText(
      "This block can only be used inside the 'create a new ... element' and 'find the element with id' blocks"
    );
    if (!this.isInFlyout && !this.getInheritedDisabled()) {
      this.setEnabled(false);
    }
  }
}

Blockly.Extensions.register("validate_in_with_context", function () {
  this.setOnChange(validateInWithContext);
});

Blockly.defineBlocksWithJsonArray([
  {
    type: "element_clicked",
    message0: "%1 %2 %3 %4 %5",
    args0: [
      {
        type: "field_label_serializable",
        name: "TEXT1",
        text: "when the element with id",
      },
      {
        type: "field_input",
        name: "ID",
        text: "button",
      },
      {
        type: "field_label_serializable",
        name: "TEXT2",
        text: "is clicked",
      },
      {
        type: "input_dummy",
      },
      {
        type: "input_statement",
        name: "HANDLER",
      },
    ],
    colour: "%{BKY_COLOUR_HUE}",
    tooltip: "When a button is clicked",
    helpUrl: "",
  },
  {
    type: "element_clicked_current",
    message0: "%1 %2 %3",
    args0: [
      {
        type: "field_label_serializable",
        name: "TEXT1",
        text: "when the element is clicked",
      },
      {
        type: "input_dummy",
      },
      {
        type: "input_statement",
        name: "HANDLER",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 60,
    tooltip: "When a button is clicked",
    helpUrl: "",
    extensions: ["validate_in_with_context"],
  },
  {
    type: "on_start",
    message0: "%1 %2 %3",
    args0: [
      {
        type: "field_label_serializable",
        name: "TEXT1",
        text: "at the start (when run is clicked)",
      },
      {
        type: "input_dummy",
      },
      {
        type: "input_statement",
        name: "HANDLER",
      },
    ],
    inputsInline: false,
    colour: "%{BKY_COLOUR_HUE}",
    tooltip: "At the start",
    helpUrl: "",
  },
  {
    type: "set_attribute",
    message0: "set the attribute %1 to %2",
    args0: [
      {
        type: "field_dropdown",
        name: "PROPERTY",
        options: [
          ["src", "src"],
          ["href", "href"],
          ["background", "backgroundColor"],
          ["color", "color"],
          ["id", "id"],
          ["class", "class"],
          ["is visible", "visibility"],
        ],
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 60,
    extensions: ["validate_in_with_context"],
  },
  {
    type: "toggle_attribute",
    message0: "toggle the class %1",
    args0: [
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 60,
    extensions: ["validate_in_with_context"],
  },
  {
    type: "set_content",
    message0: "set the text content to %1",
    args0: [
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 60,
    extensions: ["validate_in_with_context"],
  },
  {
    type: "get_input_value_with_id",
    message0: "get the value of the <input> with id %1",
    args0: [
      {
        type: "field_input",
        name: "ID",
        text: "text",
      },
    ],
    output: "String",
    colour: 60,
  },
  {
    type: "remove_contents",
    message0: "remove the contents of the element",
    args0: [],
    previousStatement: null,
    nextStatement: null,
    colour: 60,
    extensions: ["validate_in_with_context"],
  },
  {
    type: "arrays_push",
    message0: "add %1 at the %2 of array %3",
    args0: [
      {
        type: "input_value",
        name: "VALUE",
      },
      {
        type: "field_dropdown",
        name: "WHERE",
        options: [
          ["start", "START"],
          ["end", "END"],
        ],
      },
      {
        type: "input_value",
        name: "LIST",
        check: "Array",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "list_blocks",
  },
  {
    type: "arrays_forEach",
    message0: "%{BKY_CONTROLS_FOREACH_TITLE}",
    args0: [
      {
        type: "field_variable",
        name: "VAR",
        variable: null,
      },
      {
        type: "input_value",
        name: "LIST",
        check: "Array",
      },
    ],
    message1: "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
    args1: [
      {
        type: "input_statement",
        name: "DO",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "loop_blocks",
    extensions: ["contextMenu_newGetVariableBlock", "controls_forEach_tooltip"],
  },
]);

Blockly.JavaScript["arrays_getFirst"] = function (block) {
  var mode = block.getFieldValue("MODE");
  var where = block.getFieldValue("WHERE");
  var listOrder = Blockly.JavaScript.ORDER_MEMBER;
  var list = Blockly.JavaScript.valueToCode(block, "VALUE", listOrder) || "[]";
  if (mode == "GET") {
    let op = where == "FIRST" ? "[0]" : ".slice(-1)[0]";
    let code = list + op;
    return [code, Blockly.JavaScript.ORDER_MEMBER];
  } else if (mode == "GET_REMOVE") {
    let op = where == "FIRST" ? ".shift()" : ".pop()";
    let code = list + op;
    return [code, Blockly.JavaScript.ORDER_MEMBER];
  } else if (mode == "REMOVE") {
    let op = where == "FIRST" ? ".shift()" : ".pop()";
    return list + op + ";\n";
  }
};

Blockly.JavaScript["arrays_push"] = function (block) {
  var where = block.getFieldValue("WHERE");
  var list =
    Blockly.JavaScript.valueToCode(
      block,
      "LIST",
      Blockly.JavaScript.ORDER_MEMBER
    ) || "[]";
  var value =
    Blockly.JavaScript.valueToCode(
      block,
      "VALUE",
      Blockly.JavaScript.ORDER_NONE // going to be passed as a single argument to unshift
    ) || "null";
  var op = where == "START" ? ".unshift" : ".push";
  return list + op + "(" + value + ");\n";
};

Blockly.JavaScript["arrays_forEach"] = function (block) {
  var variable = Blockly.JavaScript.nameDB_.getName(
    block.getFieldValue("VAR"),
    Blockly.VARIABLE_CATEGORY_NAME
  );
  var list =
    Blockly.JavaScript.valueToCode(
      block,
      "LIST",
      Blockly.JavaScript.ORDER_MEMBER
    ) || "[]";
  var branch = Blockly.JavaScript.statementToCode(block, "DO");
  // don't need a loop trap
  var code = "";
  code += list + ".forEach((" + variable + ") => {\n" + branch + "});\n";
  return code;
};

Blockly.JavaScript["element_clicked"] = function (block) {
  var text_id = block.getFieldValue("ID");

  //let branch = Blockly.JavaScript.statementToCodeNoIndent(block, "STACK");
  Blockly.JavaScript.pushWithContextVariable("event.target");
  var statements_handler = Blockly.JavaScript.statementToCode(block, "HANDLER");
  Blockly.JavaScript.popWithContextVariable();
  // TODO: Assemble JavaScript into code variable.
  var code = `
document.getElementById('${text_id}').addEventListener('click', (event) => {
${statements_handler}
});`;
  return code;
};

/* Find the variables referenced inside the block. Modify the nameDB/variableMap so that
 * they think they are called name_<local>.
 * returns an array of object.
 * The globalName is the name of the global variable
 * The localName is the new local name that will be used until restoreGlobalVariables is called.
 */
function renameLocalVariablesUsedInBlock(block) {
  let usedVariablesById = {};
  block
    .getDescendants()
    .filter((b) => b.type === "variables_get")
    .forEach((b) => {
      usedVariablesById[b.getFieldValue("VAR")] = {
        id: b.getFieldValue("VAR"),
      };
    });
  let renamedVariables = Object.values(usedVariablesById);
  renamedVariables.forEach((variable) => {
    variable.blocklyVariable =
      Blockly.JavaScript.nameDB_.variableMap_.getVariableById(variable.id);
    variable.globalName = variable.blocklyVariable.name;
    variable.blocklyVariable.name = variable.globalName + "_local";
    // ensure no collisions
    variable.localName = Blockly.JavaScript.nameDB_.getName(
      variable.id,
      Blockly.Variables.NAME_TYPE
    );
  });
  return renamedVariables;
}

function restoreGlobalVariables(localVariables) {
  localVariables.forEach((variable) => {
    variable.blocklyVariable.name = variable.globalName;
  });
}

Blockly.JavaScript["element_clicked_current"] = function (block) {
  let localVariables = renameLocalVariablesUsedInBlock(block);
  var statements_handler = Blockly.JavaScript.statementToCode(block, "HANDLER");
  restoreGlobalVariables(localVariables);

  var code = "\n";
  localVariables.forEach((variable) => {
    code += `// deep copy global variable '${variable.globalName}' so the current 
// value is available inside the event listener
let ${variable.localName} = JSON.parse(JSON.stringify(${variable.globalName}));
`;
  });
  let withContextVariable = Blockly.JavaScript.getWithContextVariable();
  code += `${withContextVariable}.addEventListener('click', (event) => {
${statements_handler}
});`;
  return code;
};

Blockly.JavaScript["on_start"] = function (block) {
  var code = Blockly.JavaScript.statementToCodeNoIndent(block, "HANDLER");
  return code;
};

Blockly.Blocks["with_element_by_id"] = {
  init: function () {
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(45);
    this.appendDummyInput()
      .appendField("find the element with id")
      .appendField(new Blockly.FieldTextInput("list"), "ID");
    this.appendStatementInput("STACK").appendField("and");
  },
};

Blockly.JavaScript["with_element_by_id"] = function (block) {
  let elementId = block.getFieldValue("ID");
  let elementVar = Blockly.JavaScript.nameDB_.getDistinctName(
    "element_" + elementId,
    Blockly.Variables.NAME_TYPE
  );
  Blockly.JavaScript.pushWithContextVariable(elementVar);
  let branch = Blockly.JavaScript.statementToCodeNoIndent(block, "STACK");
  Blockly.JavaScript.popWithContextVariable();
  return `let ${elementVar} = document.getElementById(${Blockly.JavaScript.quote_(
    elementId
  )});
${branch}`;
};

Blockly.Blocks["with_element_by_selector"] = {
  init: function () {
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(45);
    this.appendDummyInput()
      .appendField("find the element using css selector")
      .appendField(new Blockly.FieldTextInput("#list"), "QUERY");
    this.appendStatementInput("STACK").appendField("and");
  },
};

Blockly.JavaScript["with_element_by_selector"] = function (block) {
  let elementQuery = block.getFieldValue("QUERY");
  let elementVar = Blockly.JavaScript.nameDB_.getDistinctName(
    "selectedElement",
    Blockly.Variables.NAME_TYPE
  );
  Blockly.JavaScript.pushWithContextVariable(elementVar);
  let branch = Blockly.JavaScript.statementToCodeNoIndent(block, "STACK");
  Blockly.JavaScript.popWithContextVariable();
  return `let ${elementVar} = document.querySelector(${Blockly.JavaScript.quote_(
    elementQuery
  )});
${branch}`;
};

Blockly.Blocks["with_elements_by_selector"] = {
  init: function () {
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(45);
    this.appendDummyInput()
      .appendField("find all the elements using css selector")
      .appendField(new Blockly.FieldTextInput("#list"), "QUERY");
    this.appendStatementInput("STACK").appendField("and with each");
  },
};

Blockly.JavaScript["with_elements_by_selector"] = function (block) {
  let elementQuery = block.getFieldValue("QUERY");
  let elementVar = Blockly.JavaScript.nameDB_.getDistinctName(
    "selectedElement",
    Blockly.Variables.NAME_TYPE
  );
  Blockly.JavaScript.pushWithContextVariable(elementVar);
  let branch = Blockly.JavaScript.statementToCode(block, "STACK");
  Blockly.JavaScript.popWithContextVariable();
  return `document.querySelectorAll(${Blockly.JavaScript.quote_(
    elementQuery
  )}).forEach((${elementVar}) => {
${branch}
});
`;
};

Blockly.JavaScript["set_attribute"] = function (block) {
  let value = Blockly.JavaScript.valueToCode(
    block,
    "VALUE",
    Blockly.JavaScript.ORDER_ASSIGNMENT
  );
  let property = block.getFieldValue("PROPERTY");
  if (property == "visibility") {
    value = `(${value}) ? 'visible' : 'hidden'`;
  }
  let styleAttributes = ["color", "backgroundColor", "visibility"];
  let withContextVariable = Blockly.JavaScript.getWithContextVariable();
  if (styleAttributes.includes(property)) {
    return withContextVariable + ".style." + property + " = " + value + ";\n";
  } else {
    return (
      withContextVariable +
      '.setAttribute("' +
      property +
      '", ' +
      value +
      ");\n"
    );
  }
};

Blockly.JavaScript["toggle_attribute"] = function (block) {
  let value = Blockly.JavaScript.valueToCode(
    block,
    "VALUE",
    Blockly.JavaScript.ORDER_NONE
  );
  let withContextVariable = Blockly.JavaScript.getWithContextVariable();
  return withContextVariable + `.classList.toggle(${value});\n`;
};

Blockly.JavaScript["set_content"] = function (block) {
  let value = Blockly.JavaScript.valueToCode(
    block,
    "VALUE",
    Blockly.JavaScript.ORDER_ASSIGNMENT
  );
  let withContextVariable = Blockly.JavaScript.getWithContextVariable();
  return withContextVariable + ".innerText = " + value + ";\n";
};

Blockly.JavaScript["get_input_value_with_id"] = function (block) {
  let elementId = block.getFieldValue("ID");
  let getNumberOrString = Blockly.JavaScript.provideFunction_(
    "getNumberOrString",
    [
      "function " + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + "(value) {",
      "  // Convert a string value to a number if possible",
      "  let number_value = Number(value);",
      "  if (Number.isNaN(number_value)) {",
      "    return value",
      "  } else {",
      "    return number_value",
      "  }",
      "}",
    ]
  );
  return [
    `getNumberOrString(document.getElementById(${Blockly.JavaScript.quote_(
      elementId
    )}).value)`,
    Blockly.JavaScript.ORDER_MEMBER,
  ];
};

Blockly.JavaScript["remove_contents"] = function (block) {
  let withContextVariable = Blockly.JavaScript.getWithContextVariable();
  return withContextVariable + ".replaceChildren();\n";
};

Blockly.Blocks["add_element"] = {
  init: function () {
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(60);
    this.appendDummyInput()
      .appendField("create a new")
      .appendField(
        new Blockly.FieldDropdown([
          ["<li>", "li"],
          ["<ul>", "ul"],
          ["<ol>", "ol"],
          ["<button>", "button"],
          ["<a>", "a"],
          ["<img>", "img"],
          ["<div>", "div"],
          ["<span>", "span"],
          ["<input>", "input"],
        ]),
        "ELEMENT"
      )
      .appendField("element");
    this.appendStatementInput("STACK").appendField("and");
    this.appendDummyInput().appendField("then add it here");
  },
  onchange: validateInWithContext,
};

Blockly.JavaScript["add_element"] = function (block) {
  let elementName = block.getFieldValue("ELEMENT");
  let newElementVar = Blockly.JavaScript.nameDB_.getDistinctName(
    "new_" + elementName,
    Blockly.Variables.NAME_TYPE
  );
  Blockly.JavaScript.pushWithContextVariable(newElementVar);
  let branch = Blockly.JavaScript.statementToCodeNoIndent(block, "STACK");
  Blockly.JavaScript.popWithContextVariable();
  let withContextVariable = Blockly.JavaScript.getWithContextVariable();
  return `let ${newElementVar} = document.createElement('${elementName}');
${branch}
${withContextVariable}.appendChild(${newElementVar});
`;
};

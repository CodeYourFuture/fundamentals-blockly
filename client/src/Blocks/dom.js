import * as Blockly from "blockly/core";
import BlocklyJavaScript from "blockly/javascript";

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
BlocklyJavaScript.statementToCodeNoIndent = function (block, name) {
  var targetBlock = block.getInputTargetBlock(name);
  var code = this.blockToCode(targetBlock);
  // Value blocks must return code and order of operations info.
  // Statement blocks must only return code.
  if (typeof code !== "string") {
    throw TypeError(
      "Expecting code from statement block: " +
        (targetBlock && targetBlock.type)
    );
  }
  return code;
};

BlocklyJavaScript.getWithContextVariable = function () {
  if (!(this.contextVariableStack && this.contextVariableStack[0])) {
    return "";
  }
  return this.contextVariableStack[0];
};

BlocklyJavaScript.pushWithContextVariable = function (variableName) {
  this.contextVariableStack = this.contextVariableStack || [];
  this.contextVariableStack.unshift(variableName);
};

BlocklyJavaScript.popWithContextVariable = function () {
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
      var isStatement = value === "REMOVE";
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
  /*
   * mutationToDom and domToMutation are only here for backward compatibilty with xml (probably never needed)
   */
  /**
   * Create XML to represent whether the block is a statement or a value.
   * Also represent whether there is an 'AT' input.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function () {
    var container = Blockly.utils.xml.createElement("mutation");
    var isStatement = !this.outputConnection;
    container.setAttribute("statement", isStatement);
    return container;
  },
  /**
   * Parse XML to restore the 'AT' input.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    // Note: Until January 2013 this block did not have mutations,
    // so 'statement' defaults to false and 'at' defaults to true.
    var isStatement = xmlElement.getAttribute("statement") === "true";
    this.updateStatement_(isStatement);
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
    if (newStatement !== oldStatement) {
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

const WITH_CONTEXTS = [
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
    if (WITH_CONTEXTS.indexOf(block.type) !== -1) {
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

BlocklyJavaScript["arrays_getFirst"] = function (block) {
  var mode = block.getFieldValue("MODE");
  var where = block.getFieldValue("WHERE");
  var listOrder = BlocklyJavaScript.ORDER_MEMBER;
  var list = BlocklyJavaScript.valueToCode(block, "VALUE", listOrder) || "[]";
  if (mode === "GET") {
    let op = where === "FIRST" ? "[0]" : ".slice(-1)[0]";
    let code = list + op;
    return [code, BlocklyJavaScript.ORDER_MEMBER];
  } else if (mode === "GET_REMOVE") {
    let op = where === "FIRST" ? ".shift()" : ".pop()";
    let code = list + op;
    return [code, BlocklyJavaScript.ORDER_MEMBER];
  } else if (mode === "REMOVE") {
    let op = where === "FIRST" ? ".shift()" : ".pop()";
    return list + op + ";\n";
  }
};

BlocklyJavaScript["arrays_push"] = function (block) {
  var where = block.getFieldValue("WHERE");
  var list =
    BlocklyJavaScript.valueToCode(
      block,
      "LIST",
      BlocklyJavaScript.ORDER_MEMBER
    ) || "[]";
  var value =
    BlocklyJavaScript.valueToCode(
      block,
      "VALUE",
      BlocklyJavaScript.ORDER_NONE // going to be passed as a single argument to unshift
    ) || "null";
  var op = where === "START" ? ".unshift" : ".push";
  return list + op + "(" + value + ");\n";
};

BlocklyJavaScript["arrays_forEach"] = function (block) {
  var variable = BlocklyJavaScript.nameDB_.getName(
    block.getFieldValue("VAR"),
    Blockly.VARIABLE_CATEGORY_NAME
  );
  var list =
    BlocklyJavaScript.valueToCode(
      block,
      "LIST",
      BlocklyJavaScript.ORDER_MEMBER
    ) || "[]";
  var branch = BlocklyJavaScript.statementToCode(block, "DO");
  // don't need a loop trap
  var code = "";
  code += list + ".forEach((" + variable + ") => {\n" + branch + "});\n";
  return code;
};

BlocklyJavaScript["element_clicked"] = function (block) {
  var text_id = block.getFieldValue("ID");

  //let branch = BlocklyJavaScript.statementToCodeNoIndent(block, "STACK");
  BlocklyJavaScript.pushWithContextVariable("event.target");
  var statements_handler = BlocklyJavaScript.statementToCode(block, "HANDLER");
  BlocklyJavaScript.popWithContextVariable();
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
      BlocklyJavaScript.nameDB_.variableMap_.getVariableById(variable.id);
    variable.globalName = variable.blocklyVariable.name;
    variable.blocklyVariable.name = variable.globalName + "_local";
    // ensure no collisions
    variable.localName = BlocklyJavaScript.nameDB_.getName(
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

BlocklyJavaScript["element_clicked_current"] = function (block) {
  let localVariables = renameLocalVariablesUsedInBlock(block);
  var statements_handler = BlocklyJavaScript.statementToCode(block, "HANDLER");
  restoreGlobalVariables(localVariables);

  var code = "\n";
  localVariables.forEach((variable) => {
    code += `// deep copy global variable '${variable.globalName}' so the current 
// value is available inside the event listener
let ${variable.localName} = JSON.parse(JSON.stringify(${variable.globalName}));
`;
  });
  let withContextVariable = BlocklyJavaScript.getWithContextVariable();
  code += `${withContextVariable}.addEventListener('click', (event) => {
${statements_handler}
});`;
  return code;
};

BlocklyJavaScript["on_start"] = function (block) {
  var code = BlocklyJavaScript.statementToCodeNoIndent(block, "HANDLER");
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

BlocklyJavaScript["with_element_by_id"] = function (block) {
  let elementId = block.getFieldValue("ID");
  let elementVar = BlocklyJavaScript.nameDB_.getDistinctName(
    "element_" + elementId,
    Blockly.Variables.NAME_TYPE
  );
  BlocklyJavaScript.pushWithContextVariable(elementVar);
  let branch = BlocklyJavaScript.statementToCodeNoIndent(block, "STACK");
  BlocklyJavaScript.popWithContextVariable();
  return `let ${elementVar} = document.getElementById(${BlocklyJavaScript.quote_(
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

BlocklyJavaScript["with_element_by_selector"] = function (block) {
  let elementQuery = block.getFieldValue("QUERY");
  let elementVar = BlocklyJavaScript.nameDB_.getDistinctName(
    "selectedElement",
    Blockly.Variables.NAME_TYPE
  );
  BlocklyJavaScript.pushWithContextVariable(elementVar);
  let branch = BlocklyJavaScript.statementToCodeNoIndent(block, "STACK");
  BlocklyJavaScript.popWithContextVariable();
  return `let ${elementVar} = document.querySelector(${BlocklyJavaScript.quote_(
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

BlocklyJavaScript["with_elements_by_selector"] = function (block) {
  let elementQuery = block.getFieldValue("QUERY");
  let elementVar = BlocklyJavaScript.nameDB_.getDistinctName(
    "selectedElement",
    Blockly.Variables.NAME_TYPE
  );
  BlocklyJavaScript.pushWithContextVariable(elementVar);
  let branch = BlocklyJavaScript.statementToCode(block, "STACK");
  BlocklyJavaScript.popWithContextVariable();
  return `document.querySelectorAll(${BlocklyJavaScript.quote_(
    elementQuery
  )}).forEach((${elementVar}) => {
${branch}
});
`;
};

BlocklyJavaScript["set_attribute"] = function (block) {
  let value = BlocklyJavaScript.valueToCode(
    block,
    "VALUE",
    BlocklyJavaScript.ORDER_ASSIGNMENT
  );
  let property = block.getFieldValue("PROPERTY");
  if (property === "visibility") {
    value = `(${value}) ? 'visible' : 'hidden'`;
  }
  let styleAttributes = ["color", "backgroundColor", "visibility"];
  let withContextVariable = BlocklyJavaScript.getWithContextVariable();
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

BlocklyJavaScript["set_content"] = function (block) {
  let value = BlocklyJavaScript.valueToCode(
    block,
    "VALUE",
    BlocklyJavaScript.ORDER_ASSIGNMENT
  );
  let withContextVariable = BlocklyJavaScript.getWithContextVariable();
  return withContextVariable + ".innerText = " + value + ";\n";
};

BlocklyJavaScript["get_input_value_with_id"] = function (block) {
  let elementId = block.getFieldValue("ID");
  BlocklyJavaScript.provideFunction_("getNumberOrString", [
    "function " + BlocklyJavaScript.FUNCTION_NAME_PLACEHOLDER_ + "(value) {",
    "  // Convert a string value to a number if possible",
    "  let number_value = Number(value);",
    "  if (Number.isNaN(number_value)) {",
    "    return value",
    "  } else {",
    "    return number_value",
    "  }",
    "}",
  ]);
  return [
    `getNumberOrString(document.getElementById(${BlocklyJavaScript.quote_(
      elementId
    )}).value)`,
    BlocklyJavaScript.ORDER_MEMBER,
  ];
};

BlocklyJavaScript["remove_contents"] = function (block) {
  let withContextVariable = BlocklyJavaScript.getWithContextVariable();
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

BlocklyJavaScript["add_element"] = function (block) {
  let elementName = block.getFieldValue("ELEMENT");
  let newElementVar = BlocklyJavaScript.nameDB_.getDistinctName(
    "new_" + elementName,
    Blockly.Variables.NAME_TYPE
  );
  BlocklyJavaScript.pushWithContextVariable(newElementVar);
  let branch = BlocklyJavaScript.statementToCodeNoIndent(block, "STACK");
  BlocklyJavaScript.popWithContextVariable();
  let withContextVariable = BlocklyJavaScript.getWithContextVariable();
  return `let ${newElementVar} = document.createElement('${elementName}');
${branch}
${withContextVariable}.appendChild(${newElementVar});
`;
};

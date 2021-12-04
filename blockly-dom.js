/* jshint esversion: 6 */

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

Blockly.Blocks["linked_lists_create_with"] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this {Blockly.Block}
   */
  init: function () {
    this.setHelpUrl(Blockly.Msg["LISTS_CREATE_WITH_HELPURL"]);
    this.setStyle("list_blocks");
    this.itemCount_ = 3;
    this.updateShape_();
    this.setOutput(true, "LinkedList");
    this.setMutator(new Blockly.Mutator(["lists_create_with_item"]));
    this.setTooltip(Blockly.Msg["LISTS_CREATE_WITH_TOOLTIP"]);
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function () {
    var container = Blockly.utils.xml.createElement("mutation");
    container.setAttribute("items", this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute("items"), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this {Blockly.Block}
   */
  decompose: function (workspace) {
    var containerBlock = workspace.newBlock("lists_create_with_container");
    containerBlock.initSvg();
    var connection = containerBlock.getInput("STACK").connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock("lists_create_with_item");
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  compose: function (containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock("STACK");
    // Count number of inputs.
    var connections = [];
    while (itemBlock && !itemBlock.isInsertionMarker()) {
      connections.push(itemBlock.valueConnection_);
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput("ADD" + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, "ADD" + i);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  saveConnections: function (containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock("STACK");
    var i = 0;
    while (itemBlock) {
      var input = this.getInput("ADD" + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this {Blockly.Block}
   */
  updateShape_: function () {
    if (this.itemCount_ && this.getInput("EMPTY")) {
      this.removeInput("EMPTY");
    } else if (!this.itemCount_ && !this.getInput("EMPTY")) {
      this.appendDummyInput("EMPTY").appendField(
        Blockly.Msg["LISTS_CREATE_EMPTY_TITLE"]
      );
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput("ADD" + i)) {
        var input = this.appendValueInput("ADD" + i).setAlign(
          Blockly.ALIGN_RIGHT
        );
        if (i == 0) {
          input.appendField(Blockly.Msg["LISTS_CREATE_WITH_INPUT_WITH"]);
        }
      }
    }
    // Remove deleted inputs.
    while (this.getInput("ADD" + i)) {
      this.removeInput("ADD" + i);
      i++;
    }
  },
};

Blockly.Blocks["lists_create_with_container"] = {
  /**
   * Mutator block for list container.
   * @this {Blockly.Block}
   */
  init: function () {
    this.setStyle("list_blocks");
    this.appendDummyInput().appendField(
      Blockly.Msg["LISTS_CREATE_WITH_CONTAINER_TITLE_ADD"]
    );
    this.appendStatementInput("STACK");
    this.setTooltip(Blockly.Msg["LISTS_CREATE_WITH_CONTAINER_TOOLTIP"]);
    this.contextMenu = false;
  },
};

Blockly.Blocks["lists_create_with_item"] = {
  /**
   * Mutator block for adding items.
   * @this {Blockly.Block}
   */
  init: function () {
    this.setStyle("list_blocks");
    this.appendDummyInput().appendField(
      Blockly.Msg["LISTS_CREATE_WITH_ITEM_TITLE"]
    );
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg["LISTS_CREATE_WITH_ITEM_TOOLTIP"]);
    this.contextMenu = false;
  },
};

WITH_CONTEXTS = [
  "add_element",
  "with_element_by_id",
  "with_element_by_selector",
  "with_elements_by_selector",
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
    type: "remove_contents",
    message0: "remove the contents of the element",
    args0: [],
    previousStatement: null,
    nextStatement: null,
    colour: 60,
    extensions: ["validate_in_with_context"],
  },
  {
    type: "linked_lists_get_current",
    message0: "get current item from list %1",
    args0: [
      {
        type: "input_value",
        name: "VALUE",
        check: "LinkedList",
      },
    ],
    output: null,
    style: "list_blocks",
  },
  {
    type: "linked_lists_set_current",
    message0: "select %1 item for list %2",
    args0: [
      {
        type: "field_dropdown",
        name: "METHOD",
        options: [
          ["next", "NEXT"],
          ["previous", "PREVIOUS"],
          ["first", "FIRST"],
          ["last", "LAST"],
        ],
      },
      {
        type: "input_value",
        name: "VALUE",
        check: "LinkedList",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "list_blocks",
  },
  {
    type: "linked_lists_has_next",
    message0: "list %1 has a next item",
    args0: [
      {
        type: "input_value",
        name: "VALUE",
        check: "LinkedList",
      },
    ],
    inputsInline: true,
    output: "Boolean",
    style: "list_blocks",
  },
  {
    type: "linked_lists_has_previous",
    message0: "list %1 has a previous item",
    args0: [
      {
        type: "input_value",
        name: "VALUE",
        check: "LinkedList",
      },
    ],
    inputsInline: true,
    output: "Boolean",
    style: "list_blocks",
  },
  {
    type: "linked_lists_has_current",
    message0: "list %1 has a current item",
    args0: [
      {
        type: "input_value",
        name: "VALUE",
        check: "LinkedList",
      },
    ],
    inputsInline: true,
    output: "Boolean",
    style: "list_blocks",
  },
]);

Blockly.JavaScript["linked_lists_create_with"] = function (block) {
  // Create a list with any number of elements of any type.
  var elements = new Array(block.itemCount_);
  for (var i = 0; i < block.itemCount_; i++) {
    elements[i] =
      Blockly.JavaScript.valueToCode(
        block,
        "ADD" + i,
        Blockly.JavaScript.ORDER_NONE
      ) || "null";
  }
  var data = "[" + elements.join(", ") + "]";
  var code = `{currentIndex: 0, data: ${data}}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript["linked_lists_get_current"] = function (block) {
  return generateExpressionWithCachedValue(
    "list_getCurrent",
    block,
    (value) => `${value}.data[${value}.currentIndex]`
  );
};

Blockly.JavaScript["linked_lists_set_current"] = function (block) {
  let value = Blockly.JavaScript.valueToCode(
    block,
    "VALUE",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  let code = "";
  if (!value.match(/^\w+$/)) {
    // if we don't have a variable create a variable and treat the variable as the new value
    let cacheVar = Blockly.JavaScript.nameDB_.getDistinctName(
      "list",
      Blockly.Variables.NAME_TYPE
    );
    code = `let ${cacheVar} = ${value};\n`;
    value = cacheVar;
  }
  code += `${value}.currentIndex = `;
  switch (block.getFieldValue("METHOD")) {
    case "NEXT":
      let codeNext = generateExpressionFunctionCall(
        "list_getNextIndex",
        value,
        (value) =>
          `${value}.currentIndex < ${value}.data.length ? ${value}.currentIndex + 1 : ${value}.data.length`
      );
      return code + codeNext + ";\n";
    case "PREVIOUS":
      let codePrevious = generateExpressionFunctionCall(
        "list_getPreviousIndex",
        value,
        (value) => `${value}.currentIndex > 0 ? ${value}.currentIndex - 1 : -1`
      );
      return code + codePrevious + ";\n";
    case "LAST":
      return code + `${value}.data.length - 1;\n`;
    case "FIRST":
      return code + "0;\n";
  }
};

Blockly.JavaScript["linked_lists_has_next"] = function (block) {
  return generateExpressionWithCachedValue(
    "list_hasNext",
    block,
    (value) => `${value}.currentIndex < ${value}.data.length - 1`,
    Blockly.JavaScript.ORDER_RELATIONAL
  );
};

Blockly.JavaScript["linked_lists_has_previous"] = function (block) {
  let value = Blockly.JavaScript.valueToCode(
    block,
    "VALUE",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  return [`${value}.currentIndex > 0`, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript["linked_lists_has_current"] = function (block) {
  return generateExpressionWithCachedValue(
    "list_hasCurrent",
    block,
    (value) =>
      `${value}.currentIndex >= 0 && ${value}.currentIndex < ${value}.data.length`,
    Blockly.JavaScript.ORDER_LOGICAL_AND
  );
};

function generateExpressionWithCachedValue(
  name,
  block,
  generateExpression,
  order = Blockly.JavaScript.ORDER_ATOMIC,
  forceGenerateFunction = true
) {
  let value = Blockly.JavaScript.valueToCode(
    block,
    "VALUE",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  if (value.match(/^\w+$/) && !forceGenerateFunction) {
    return [generateExpression(value), order];
  } else {
    return [
      generateExpressionFunctionCall(name, value, generateExpression),
      Blockly.JavaScript.ORDER_FUNCTION_CALL,
    ];
  }
}

function generateExpressionFunctionCall(name, value, generateExpression) {
  let functionName = Blockly.JavaScript.provideFunction_(name, [
    "function " + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + "(aList) {",
    "  return " + generateExpression("aList"),
    "}",
  ]);
  // Generate the function call for this block.
  return functionName + "(" + value + ")";
}

Blockly.JavaScript["element_clicked"] = function (block) {
  var text_id = block.getFieldValue("ID");
  var statements_handler = Blockly.JavaScript.statementToCode(block, "HANDLER");
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
      .appendField(new Blockly.FieldTextInput("foo"), "ID");
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

Blockly.JavaScript["set_content"] = function (block) {
  let value = Blockly.JavaScript.valueToCode(
    block,
    "VALUE",
    Blockly.JavaScript.ORDER_ASSIGNMENT
  );
  let withContextVariable = Blockly.JavaScript.getWithContextVariable();
  return withContextVariable + ".innerText = " + value + ";\n";
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

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

//   {
//     type: "linked_lists_get_current",
//     message0: "get current item from list %1",
//     args0: [
//       {
//         type: "input_value",
//         name: "VALUE",
//         check: "LinkedList",
//       },
//     ],
//     output: null,
//     style: "list_blocks",
//   },
//   {
//     type: "linked_lists_set_current",
//     message0: "select %1 item for list %2",
//     args0: [
//       {
//         type: "field_dropdown",
//         name: "METHOD",
//         options: [
//           ["next", "NEXT"],
//           ["previous", "PREVIOUS"],
//           ["first", "FIRST"],
//           ["last", "LAST"],
//         ],
//       },
//       {
//         type: "input_value",
//         name: "VALUE",
//         check: "LinkedList",
//       },
//     ],
//     previousStatement: null,
//     nextStatement: null,
//     style: "list_blocks",
//   },
//   {
//     type: "linked_lists_has_next",
//     message0: "list %1 has a next item",
//     args0: [
//       {
//         type: "input_value",
//         name: "VALUE",
//         check: "LinkedList",
//       },
//     ],
//     inputsInline: true,
//     output: "Boolean",
//     style: "list_blocks",
//   },
//   {
//     type: "linked_lists_has_previous",
//     message0: "list %1 has a previous item",
//     args0: [
//       {
//         type: "input_value",
//         name: "VALUE",
//         check: "LinkedList",
//       },
//     ],
//     inputsInline: true,
//     output: "Boolean",
//     style: "list_blocks",
//   },
//   {
//     type: "linked_lists_has_current",
//     message0: "list %1 has a current item",
//     args0: [
//       {
//         type: "input_value",
//         name: "VALUE",
//         check: "LinkedList",
//       },
//     ],
//     inputsInline: true,
//     output: "Boolean",
//     style: "list_blocks",
//   },

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

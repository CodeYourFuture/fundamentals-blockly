import * as Blockly from "blockly/core";
import BlocklyJavaScript from "blockly/javascript";

function provideRandomInt() {
  return BlocklyJavaScript.provideFunction_("randomInt", [
    "function " + BlocklyJavaScript.FUNCTION_NAME_PLACEHOLDER_ + "(n) {",
    "  // Return a random number from in [0, n[",
    "  return Math.floor(Math.random()*n);",
    "}",
  ]);
}

function provideRandomMember() {
  let randomInt = provideRandomInt();
  return BlocklyJavaScript.provideFunction_("randomMember", [
    "function " + BlocklyJavaScript.FUNCTION_NAME_PLACEHOLDER_ + "(arr) {",
    "  // Return a random member of the array",
    "  return arr[" + randomInt + "(arr.length)]",
    "}",
  ]);
}

Blockly.defineBlocksWithJsonArray([
  {
    type: "get_randomWord",
    message0: "get a random %1",
    args0: [
      {
        type: "field_dropdown",
        name: "TYPE",
        options: [
          ["word", "WORD"],
          ["noun", "NOUN"],
          ["verb", "VERB"],
          ["adjective", "ADJECTIVE"],
        ],
      },
    ],
    output: "String",
    colour: "%{BKY_TEXTS_HUE}",
  },
  {
    type: "get_randomMember",
    message0: "get a random item from array %1",
    args0: [
      {
        type: "input_value",
        name: "ARRAY",
      },
    ],
    output: null,
    style: "list_blocks",
  },
  {
    type: "text_to_speech",
    message0: "say %1",
    args0: [
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "%{BKY_TEXTS_HUE}",
  },
  {
    type: "get_sum",
    message0: "get the sum of the numbers in array %1",
    args0: [
      {
        type: "input_value",
        name: "ARRAY",
      },
    ],
    output: Number,
    style: "list_blocks",
  },
]);

BlocklyJavaScript["get_randomWord"] = function (block) {
  const getWords = BlocklyJavaScript.provideFunction_("getWords", [
    "function " + BlocklyJavaScript.FUNCTION_NAME_PLACEHOLDER_ + "(type) {",
    "  // Return words of a given type, or all words if type is 'WORD'",
    "  let words = [",
    "    {type: 'ADJECTIVE', value: 'big'},",
    "    {type: 'ADJECTIVE', value: 'purple'},",
    "    {type: 'ADJECTIVE', value: 'miscellaneous'},",
    "    {type: 'ADJECTIVE', value: 'interesting'},",
    "    {type: 'ADJECTIVE', value: 'collapsed'},",
    "    {type: 'NOUN', value: 'umbrella'},",
    "    {type: 'NOUN', value: 'knee'},",
    "    {type: 'NOUN', value: 'banana'},",
    "    {type: 'NOUN', value: 'platypus'},",
    "    {type: 'NOUN', value: 'bottle'},",
    "    {type: 'VERB', value: 'delineated'},",
    "    {type: 'VERB', value: 'read'},",
    "    {type: 'VERB', value: 'saw'},",
    "    {type: 'VERB', value: 'ate'},",
    "    {type: 'VERB', value: 'magicked'},",
    "  ];",
    "  return words.filter(word => type === 'WORD' || word.type === type).map(word => word.value);",
    "}",
  ]);
  const type = block.getFieldValue("TYPE");
  const randomMember = provideRandomMember();
  return [
    `${randomMember}(${getWords}('${type}'))`,
    BlocklyJavaScript.ORDER_FUNCTION_CALL,
  ];
};

BlocklyJavaScript["get_randomMember"] = function (block) {
  const randomMember = provideRandomMember();
  var array =
    BlocklyJavaScript.valueToCode(
      block,
      "ARRAY",
      BlocklyJavaScript.ORDER_NONE
    ) || "[]";
  return [`${randomMember}(${array})`, BlocklyJavaScript.ORDER_FUNCTION_CALL];
};

BlocklyJavaScript["get_sum"] = function (block) {
  var array =
    BlocklyJavaScript.valueToCode(
      block,
      "ARRAY",
      BlocklyJavaScript.ORDER_MEMBER
    ) || "[]";
  return [
    `${array}.reduce((a,b) => a+b, 0)`,
    BlocklyJavaScript.ORDER_FUNCTION_CALL,
  ];
};

BlocklyJavaScript["text_to_speech"] = function (block) {
  var utterance =
    BlocklyJavaScript.valueToCode(
      block,
      "VALUE",
      BlocklyJavaScript.ORDER_NONE
    ) || "";
  return `window.speechSynthesis.speak(new SpeechSynthesisUtterance(${utterance}));\n`;
};

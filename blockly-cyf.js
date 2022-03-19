/* jshint esversion: 6 */

function provideRandomInt() {
  return Blockly.JavaScript.provideFunction_("randomInt", [
    "function " + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + "(n) {",
    "  // Return a random number from in [0, n[",
    "  return Math.floor(Math.random()*n);",
    "}",
  ]);
}

function provideRandomMember() {
  let randomInt = provideRandomInt();
  return Blockly.JavaScript.provideFunction_("randomMember", [
    "function " + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + "(arr) {",
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

Blockly.JavaScript["get_randomWord"] = function (block) {
  const getWords = Blockly.JavaScript.provideFunction_("getWords", [
    "function " + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + "(type) {",
    "  // Return words of a given type, or all words if type is 'WORD'",
    "  let words = [",
    "    {type: 'ADJECTIVE', value: 'big'},",
    "    {type: 'ADJECTIVE', value: 'purple'},",
    "    {type: 'ADJECTIVE', value: 'new'},",
    "    {type: 'ADJECTIVE', value: 'interesting'},",
    "    {type: 'ADJECTIVE', value: 'curious'},",
    "    {type: 'ADJECTIVE', value: 'happy'},",
    "    {type: 'ADJECTIVE', value: 'busy'},",
    "    {type: 'ADJECTIVE', value: 'tiny'},",
    "    {type: 'NOUN', value: 'umbrella'},",
    "    {type: 'NOUN', value: 'knee'},",
    "    {type: 'NOUN', value: 'banana'},",
    "    {type: 'NOUN', value: 'platypus'},",
    "    {type: 'NOUN', value: 'cat'},",
    "    {type: 'NOUN', value: 'mouse'},",
    "    {type: 'NOUN', value: 'house'},",
    "    {type: 'VERB', value: 'impressed'},",
    "    {type: 'VERB', value: 'honoured'},",
    "    {type: 'VERB', value: 'saw'},",
    "    {type: 'VERB', value: 'ate'},",
    "    {type: 'VERB', value: 'surprised'},",
    "    {type: 'VERB', value: 'annoyed'},",
    "    {type: 'VERB', value: 'touched'},",
    "    {type: 'VERB', value: 'understood'},",
    "    {type: 'VERB', value: 'taught'},",
    "  ];",
    "  return words.filter(word => type === 'WORD' || word.type === type).map(word => word.value);",
    "}",
  ]);
  const type = block.getFieldValue("TYPE");
  const randomMember = provideRandomMember();
  return [
    `${randomMember}(${getWords}('${type}'))`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL,
  ];
};

Blockly.JavaScript["get_randomMember"] = function (block) {
  const randomMember = provideRandomMember();
  var array =
    Blockly.JavaScript.valueToCode(
      block,
      "ARRAY",
      Blockly.JavaScript.ORDER_NONE
    ) || "[]";
  return [`${randomMember}(${array})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript["get_sum"] = function (block) {
  var array =
    Blockly.JavaScript.valueToCode(
      block,
      "ARRAY",
      Blockly.JavaScript.ORDER_MEMBER
    ) || "[]";
  return [
    `${array}.reduce((a,b) => a+b, 0)`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL,
  ];
};

Blockly.JavaScript["text_to_speech"] = function (block) {
  var utterance =
    Blockly.JavaScript.valueToCode(
      block,
      "VALUE",
      Blockly.JavaScript.ORDER_NONE
    ) || "";
  return `window.speechSynthesis.speak(new SpeechSynthesisUtterance(${utterance}));\n`;
};

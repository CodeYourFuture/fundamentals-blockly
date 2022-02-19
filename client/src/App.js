import { useState } from "react";
import * as Blockly from "blockly/core";
import locale from "blockly/msg/en";
import "blockly/blocks";

import useBlockly from "./Blockly/useBlockly";

import "./App.css";

Blockly.setLocale(locale);

export default function App() {
  const { BlocklyComponent, generate } = useBlockly({
    initialBlock: {
      kind: "controls_if",
      x: 10,
      y: 10,
    },
    toolbox: {
      kind: "categoryToolbox",
      contents: [
        {
          kind: "category",
          name: "Control",
          contents: [
            {
              kind: "block",
              type: "controls_if",
            },
          ],
        },
        {
          kind: "category",
          name: "Logic",
          contents: [
            {
              kind: "block",
              type: "logic_compare",
            },
            {
              kind: "block",
              type: "logic_operation",
            },
            {
              kind: "block",
              type: "logic_boolean",
            },
          ],
        },
      ],
    },
  });

  const [generated, setGenerated] = useState("");

  function handleGenerate() {
    setGenerated(generate());
  }

  return (
    <div className="page">
      <h1 className="title">CYF Blocks</h1>

      <div className="blockly-wrapper">
        <BlocklyComponent />
      </div>

      <div className="output">
        <button onClick={handleGenerate}>Generate</button>
        <code>{generated}</code>
      </div>
    </div>
  );
}

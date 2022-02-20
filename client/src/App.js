import { useState } from "react";
import * as Blockly from "blockly/core";
import locale from "blockly/msg/en";
import "blockly/blocks";

import "./Blocks/dom";
import "./Blocks/cyf";
import useBlockly from "./Blockly/useBlockly";

import "./App.css";

Blockly.setLocale(locale);

export default function App() {
  const { BlocklyComponent, generate } = useBlockly({
    toolbox: {
      kind: "categoryToolbox",
      contents: [
        {
          kind: "category",
          name: "Values",
          contents: [
            {
              kind: "block",
              type: "text",
            },
            {
              kind: "block",
              type: "get_randomWord",
            },
          ],
        },
        {
          kind: "category",
          name: "HTML",
          contents: [
            {
              kind: "block",
              type: "on_start",
            },
            {
              kind: "block",
              type: "with_element_by_id",
            },
            {
              kind: "block",
              type: "set_content",
              // AFAICT, there's no JSON api for values/shadows, so stringifying
              // some XML it is ¯\_(ツ)_/¯
              blockxml:
                '<block type="set_content"><value name="VALUE"><shadow type="text"> </shadow></value></block>',
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

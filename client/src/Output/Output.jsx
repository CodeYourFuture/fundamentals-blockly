import React from "react";
import Button from "../Button/Button";
import okaida from 'prism-react-renderer/themes/okaidia';
import './Output.scss'
import Highlight, { defaultProps } from "prism-react-renderer";

const Output = ({ generatedCode, generateCodeButton }) => (
<section className="c-output">
    <Button context="c-output__generate" text="Generate"  action={generateCodeButton}/>
   
    <Highlight {...defaultProps} code={generatedCode} language="javascript" theme={okaida}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={className} style={style}>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
  </section>
);

export default Output;
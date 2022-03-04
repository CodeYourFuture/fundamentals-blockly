import React from "react";
import okaida from 'prism-react-renderer/themes/okaidia';
import './Output.scss'
import Highlight, { defaultProps } from "prism-react-renderer";

const Readout = ({renderedCode}) => (
  <Highlight {...defaultProps} code={renderedCode} language="javascript" theme={okaida}>
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
);

export default Readout;
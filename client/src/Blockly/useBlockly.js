import { useMemo, useRef } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import _ from "lodash";
import * as Blockly from "blockly/core";
import BlocklyJS from "blockly/javascript";
import "./Blockly.scss";
import * as Theme from "./CYFTheme";

export default function useBlockly({ initialBlock, toolbox, theme }) {
  const wrapperRef = useRef();
  const workspaceRef = useRef();

  // Since the deps are objects, we need to deep compare them
  useDeepCompareEffect(() => {
    // Inject the workspace
    workspaceRef.current = Blockly.inject(wrapperRef.current, {
      // Unfortuntely Blockly mutates the toolbox object when initialising. This
      // means that the dep changes between renders, which in turn means that
      // the workspace is re-injected
      toolbox: _.cloneDeep(toolbox),
      theme: Theme,
      // does this mean it cannot be https://developers.google.com/blockly/guides/configure/web/resizable ?
    });

    // Set the initial block in the workspace
    if (initialBlock) {
      let block = workspaceRef.current.newBlock(initialBlock.kind);
      block.moveBy(initialBlock.x, initialBlock.y);
      block.initSvg();

      workspaceRef.current.render();
    }

    return () => {
      workspaceRef.current.dispose();
    };
  }, [toolbox, initialBlock, theme]);

  return useMemo(
    () => ({
      // Return a component to inject the workspace
      BlocklyComponent: () => (
        <section
          ref={wrapperRef}
          className="c-blockly"
          aria-label="Visual Block Editor."
        />
      ),
      // Generate code from the workspace
      generate: () => {
        return BlocklyJS.workspaceToCode(workspaceRef.current);
      },
    }),
    []
  );
}

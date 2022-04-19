import { useState } from "react";
import * as Blockly from "blockly/core";
import locale from "blockly/msg/en";
import "blockly/blocks";

import "./Blocks/dom";
import "./Blocks/cyf";
import useBlockly from "./Blockly/useBlockly";

import exercises from "./Exercises"

import Split from "react-split-grid";
import TextPanel from "./TextPanel/TextPanel";
import Output from "./Output/Output";
import Header from "./Layout/Header/Header";
import Menu from "./Layout/Menu/Menu";
import Footer from "./Layout/Footer/Footer";
import "./App.scss";

import { ReactComponent as Background } from "../src/svgs/Humaaans-Phone.svg";

Blockly.setLocale(locale);

function useExercise() {
  const [exerciseIndex, setExerciseIndex] = useState(0);

  function nextExercise() {
    setExerciseIndex(exerciseIndex + 1);
  }
  function prevExercise() {
    setExerciseIndex(exerciseIndex - 1);
  }

  return {
    exercise: exercises[exerciseIndex],
    hasNextExercise: exerciseIndex + 1 < exercises.length,
    nextExercise,
    hasPrevExercise: exerciseIndex - 1 >= 0,
    prevExercise,
  };
}

export default function App() {
  const {
    exercise,
    hasNextExercise,
    nextExercise,
    hasPrevExercise,
    prevExercise,
  } = useExercise();

  const { BlocklyComponent, generate } = useBlockly({
    toolbox: exercise.toolbox,
  });

  const [generated, setGenerated] = useState("");

  function handleGenerate() {
    setGenerated(generate());
  }
  // these are resizable panels -- a possible solution to the problem of making all three things available
  // so the user can compare across text, blocks, and output
  // not married to this

  return (
    <div className="c-layout">
      <Background
        style={{
          position: "absolute",
          height: "100vh",
          width: "auto",
          mixBlendMode: "multiply",
          zIndex: "-1",
          left: "33vw",
        }}
      />
      <Header />
      <Menu />
      <Split
        minSize={100}
        cursor="col-resize"
        sizes={[50, 50, 200]}
        gutterSize={48}
        gutterAlign="center"
        dragInterval={1}
        direction="horizontal"
        render={({ getGridProps, getGutterProps }) => (
          <main {...getGridProps()} className="c-layout__panels">
            <TextPanel
              exercise={exercise}
              navigation={{
                nextExercise,
                prevExercise,
                hasNextExercise,
                hasPrevExercise,
              }}
            />
            <div
              {...getGutterProps("column", 1)}
              className="c-button c-button--handle"
              role="button"
            ></div>
            <Output
              generatedCode={generated}
              generateCodeButton={handleGenerate}
            />
            <div
              {...getGutterProps("column", 3)}
              className="c-button c-button--handle"
            ></div>
            <BlocklyComponent />
          </main>
        )}
      />

      <Footer />
    </div>
  );
}

import { useState } from "react";
import * as Blockly from "blockly/core";
import locale from "blockly/msg/en";
import "blockly/blocks";

import "./Blocks/dom";
import "./Blocks/cyf";
import useBlockly from "./Blockly/useBlockly";

import * as Exercise1 from "./Exercises/01-stuff";
import * as Exercise2 from "./Exercises/02-more-stuff";

import Split from "react-split-grid";
import TextPanel from "./TextPanel/TextPanel";
import Output from "./Output/Output";
import Header from "./Layout/Header/Header";
import Menu from "./Layout/Menu/Menu";
import Footer from "./Layout/Footer/Footer";
import Button from "./Button/Button";
import "./App.scss";

Blockly.setLocale(locale);

// just left all this and presumed you will pass whatever you decide to do into the text panel
const exercises = [Exercise1, Exercise2];

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
  const Grid = ({ getGridProps, getGutterProps }) => (
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
      <Output generatedCode={generated} generateCodeButton={handleGenerate} />
      <div
        {...getGutterProps("column", 3)}
        className="c-button c-button--handle"
      ></div>
      <BlocklyComponent />
    </main>
  );

  return (
    <div className="c-layout">
      <Header />
      <Menu />
      <Split
        minSize={100}
        cursor="col-resize"
        component={Grid}
        sizes={[50, 50, 200]}
        expandToMin={true}
        gutterSize={48}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
      />
      <Footer />
    </div>
  );
}

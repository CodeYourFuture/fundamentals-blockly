import { useState } from "react";
import * as Blockly from "blockly/core";
import locale from "blockly/msg/en";
import "blockly/blocks";

import "./Blocks/dom";
import "./Blocks/cyf";
import useBlockly from "./Blockly/useBlockly";

import * as Exercise1 from "./Exercises/01-stuff";
import * as Exercise2 from "./Exercises/02-more-stuff";

import Output from "./Output/Output";

import "./App.scss";

Blockly.setLocale(locale);

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

  return (
    <div className="page">
      <header>
        <h1 className="title">CYF Blocks</h1>
        <button class="trigger menu button">
          <span class="text">Menu</span>
        </button>
      </header>
      <nav aria-label="Main Site Menu.">
        <ol></ol>
      </nav>

      <div className="blockly-wrapper">
        <BlocklyComponent />
      </div>

      <section className="output">
        <button onClick={handleGenerate}>Generate</button>
        <Output renderedCode={generated} />
      </section>

      <div>
        <div>
          {hasNextExercise && (
            <button onClick={nextExercise}>Next exercise</button>
          )}
          {hasPrevExercise && (
            <button onClick={prevExercise}>Previous exercise</button>
          )}
        </div>
        <exercise.Lesson />
      </div>
    </div>
  );
}

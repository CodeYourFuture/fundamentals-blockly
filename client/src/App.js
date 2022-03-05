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
import Header from "./Layout/Header/Header";
import Menu from "./Layout/Menu/Menu";
import Footer from "./Layout/Footer/Footer";
import Button from "./Button/Button";
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
    <div className="c-layout">
      <Header />
      <Menu />
      <div class="c-layout__panels c-panels">
        {/* move this to a copy component? */}
        <div>
          <nav className="c-navigator">
            {hasNextExercise && (
              <Button
                context="c-navigator__next"
                text="Next exercise"
                action={nextExercise}
              />
            )}
            {hasPrevExercise && (
              <Button
                context="c-navigator__previous"
                text="Previous exercise"
                action={prevExercise}
              />
            )}
          </nav>
          <exercise.Lesson />
        </div>

        <section className="c-output">
          {/* does this button belong here or should it go in a toolbar? */}
          <Button
            context="c-output__generate"
            text="Generate"
            action={handleGenerate}
          />
          <Output renderedCode={generated} />
        </section>
      </div>

      <div className="c-layout__blockly">
        <BlocklyComponent />
      </div>

      <Footer />
    </div>
  );
}

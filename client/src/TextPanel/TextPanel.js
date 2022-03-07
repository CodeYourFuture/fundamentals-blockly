import React from "react";
import Button from "../Button/Button";
const TextPanel = (exercise, navigation) => (
  <section aria-label="Instructions.">
    <nav className="c-navigator">
      {navigation.hasNextExercise && (
        <Button
          context="c-navigator__next"
          text="Next exercise"
          action={navigation.nextExercise}
        />
      )}
      {navigation.hasPrevExercise && (
        <Button
          context="c-navigator__previous"
          text="Previous exercise"
          action={navigation.prevExercise}
        />
      )}
    </nav>
    <exercise.Lesson />
  </section>
);

export default TextPanel;

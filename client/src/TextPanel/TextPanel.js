import React from "react";
import Button from "../Button/Button";
import "./TextPanel.scss";

const TextPanel = ({ exercise, navigation }) => (
  <section aria-label="Instructions." className="c-textpanel">
    <nav className="c-textpanel__nav">
      {navigation.hasNextExercise && (
        <Button
          context="c-textpanel__next"
          text="Next exercise"
          action={navigation.nextExercise}
        />
      )}
      {navigation.hasPrevExercise && (
        <Button
          context="c-textpanel__previous"
          text="Previous exercise"
          action={navigation.prevExercise}
        />
      )}
    </nav>
    <section className="c-textpanel__text">
      <exercise.Lesson />
    </section>
  </section>
);

export default TextPanel;

import React from "react";
import Button from "../Button/Button";
import LessonMarkdown from "../LessonMarkdown";
import "./TextPanel.scss";

const TextPanel = ({ exerciseMd, navigation }) => (
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
      < LessonMarkdown text={exerciseMd} />
    </section>
  </section>
);

export default TextPanel;

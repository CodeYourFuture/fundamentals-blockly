import { useState } from "react";
import * as Exercise1 from "./01-stuff";
import * as Exercise2 from "./02-more-stuff";

// just left all this and presumed you will pass whatever you decide to do into the text panel
const exercises = [Exercise1, Exercise2];

export function useExercise() {
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

import { useEffect, useState } from "react";
import importAll from "import-all.macro";
import ReactMarkdown from "react-markdown";

// Use importAll babel macro to import all markdown files using a glob. Then
// transform into Map of exercise index => markdown content
const exerciseImports = importAll.sync("./*.md");

export function useExercise() {
  const [exercises, setExercises] = useState(new Map());
  const [exerciseIndex, setExerciseIndex] = useState(1);

  useEffect(() => {
    const run = async () => {
      const ex = await importsToMap(exerciseImports);
      setExercises(ex);
    };
    run();
  }, []);

  function nextExercise() {
    setExerciseIndex(exerciseIndex + 1);
  }
  function prevExercise() {
    setExerciseIndex(exerciseIndex - 1);
  }

  const exercise = exercises.get(exerciseIndex) || "";

  return {
    exercise: <ReactMarkdown>{exercise}</ReactMarkdown>,
    hasNextExercise: exerciseIndex < exercises.size,
    nextExercise,
    hasPrevExercise: exerciseIndex > 1,
    prevExercise,
  };
}

/**
 * Transform an object of filename keys => import values into a Map of exercise
 * index (computed from the filename) => markdown content
 */
async function importsToMap(imports) {
  const filenameToImportEntries = Object.entries(imports);

  const indexToImportEntriesPromise = filenameToImportEntries.map(
    async ([filename, module]) => {
      const match = filename.match(/\.\/(?<index>\d*)-.*\.md/);
      const { index } = match.groups;

      const res = await fetch(module.default);
      const md = await res.text();

      return [parseInt(index, 10), md];
    }
  );

  const indexToImportEntries = await Promise.all(indexToImportEntriesPromise);

  return new Map(indexToImportEntries);
}

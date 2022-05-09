import { useEffect, useState } from "react";
import importAll from "import-all.macro";
import ReactMarkdown from "react-markdown";
import { visit } from "unist-util-visit";
import { remark } from "remark";
import remarkDirective from "remark-directive";

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

  const exercise = exercises.get(exerciseIndex);

  function blockPlugin() {
    return (tree) => {
      visit(tree, "textDirective", (node) => {
        if (node.name === "block") {
          const data = node.data || (node.data = {});

          data.hName = "span";
          data.hProperties = {
            class: "block",
            "data-kind": node.attributes.type,
            "data-category": node.attributes.category,
          };
          data.hChildren = [
            {
              type: "text",
              value: "text",
            },
          ];
        }
      });
    };
  }

  return {
    exercise: (
      <ReactMarkdown remarkPlugins={[remarkDirective, blockPlugin]}>
        {exercise?.md || ""}
      </ReactMarkdown>
    ),
    toolbox: exercise?.toolbox || { contents: [] },
    hasNextExercise: exerciseIndex < exercises.size,
    nextExercise,
    hasPrevExercise: exerciseIndex > 1,
    prevExercise,
  };
}

function extractToolbox(md) {
  return new Promise(async (resolve) => {
    await remark()
      .use(remarkDirective)
      .use(() => (tree) => {
        const blocks = [];
        visit(tree, (node) => {
          if (node.type === "textDirective" && node.name === "block") {
            blocks.push({
              type: node.attributes.type,
              category: node.attributes.category,
            });
          }
        });

        const categorisedBlocks = blocks.reduce(
          (acc, block) => {
            const category = acc.contents.find(
              (c) => block.category === c.name
            );

            if (category) {
              category.contents.push({
                kind: "block",
                type: block.type,
              });
            } else {
              acc.contents.push({
                kind: "category",
                name: block.category,
                contents: [
                  {
                    kind: "block",
                    type: block.type,
                  },
                ],
              });
            }

            return acc;
          },
          {
            kind: "categoryToolbox",
            contents: [],
          }
        );

        resolve(categorisedBlocks);
      })
      .process(md);
  });
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
      const toolbox = await extractToolbox(md);

      return [parseInt(index, 10), { md, toolbox }];
    }
  );

  const indexToImportEntries = await Promise.all(indexToImportEntriesPromise);

  return new Map(indexToImportEntries);
}

import LessonMarkdown from "../../LessonMarkdown";
import markdownUrl from "./lesson.md";

export function Lesson() {
  return <LessonMarkdown url={markdownUrl} />;
}

export const toolbox = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Values",
      contents: [
        {
          kind: "block",
          type: "math_number",
        },
        {
          kind: "block",
          type: "text",
        },
        {
          kind: "block",
          type: "colour_picker",
        },
        {
          kind: "block",
          type: "logic_boolean",
        },
      ],
    },
    {
      kind: "category",
      name: "HTML",
      contents: [
        {
          kind: "block",
          type: "on_start",
        },
        {
          kind: "block",
          type: "with_element_by_id",
        },
        {
          kind: "block",
          type: "set_content",
          blockxml:
            "<block type='set_content'><value name='VALUE'><shadow type='text'> </shadow></value></block>",
        },
        {
          kind: "block",
          type: "set_attribute",
        },
      ],
    },
  ],
};

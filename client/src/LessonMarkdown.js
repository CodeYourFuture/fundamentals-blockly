import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function LessonMarkdown({ md }) {
  const [status, setStatus] = useState("pending");
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    (function getText() {
      try {
        setMarkdown(md);
        setStatus("done");
      } catch (e) {
        setStatus("error");
      }
    })();
  }, [md]);

  if (status === "pending") {
    return <span>Loading&hellip;</span>;
  } else if (status === "error") {
    return (
      <span>
        Something went wrong <span aria-hidden="true">😕</span>
      </span>
    );
  } else {
    return <ReactMarkdown>{markdown}</ReactMarkdown>;
  }
}

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function LessonMarkdown({ url }) {
  const [status, setStatus] = useState("pending");
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    (async function getText() {
      try {
        const res = await fetch(url);
        const text = await res.text();
        setMarkdown(text);
        setStatus("done");
      } catch (e) {
        setStatus("error");
      }
    })();
  }, [url]);

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

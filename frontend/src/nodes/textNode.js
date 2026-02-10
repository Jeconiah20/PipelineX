import { useState, useEffect, useRef } from "react";
import BaseNode from "./BaseNode";

export default function TextNode({ id, data }) {
  const [text, setText] = useState("");
  const [height, setHeight] = useState(40);
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Update height as user types
  useEffect(() => {
    if (textareaRef.current) {
      setHeight(textareaRef.current.scrollHeight);
    }
  }, [text]);

  // Detect variables like {{input}}, {{value}}, etc.
  useEffect(() => {
    const matches = text.match(/{{\s*(\w+)\s*}}/g) || [];
    const vars = matches.map((v) => v.replace(/[{}]/g, "").trim());
    setVariables(vars);
  }, [text]);

  return (
    <BaseNode
      title="Text"
      inputs={variables}        // dynamically create input handles
      outputs={["output"]}
    >
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          height,
          resize: "none",
          padding: 4,
          boxSizing: "border-box",
        }}
        placeholder="Type here..."
      />
    </BaseNode>
  );
}

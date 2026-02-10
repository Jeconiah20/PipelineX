import BaseNode from "./BaseNode";

export default function LLMNode({ id, data }) {
  return (
    <BaseNode
      title="LLM"
      inputs={["input"]}
      outputs={["output"]}
    >
      <div>LLM Node</div>
    </BaseNode>
  );
}

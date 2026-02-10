import BaseNode from "./BaseNode";

export default function OutputNode({ id, data }) {
  return (
    <BaseNode
      title="Output"
      inputs={["input"]}
    >
      <div>Output Node</div>
    </BaseNode>
  );
}

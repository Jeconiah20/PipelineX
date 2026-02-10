import BaseNode from "./BaseNode";

export default function MathNode({ id, data }) {
  return (
    <BaseNode
      title="Math"
      inputs={["a", "b"]}
      outputs={["result"]}
    >
      <div>Math Node</div>
    </BaseNode>
  );
}

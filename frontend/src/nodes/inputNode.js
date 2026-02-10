import BaseNode from "./BaseNode";

export default function InputNode({ id, data }) {
  return (
    <BaseNode
      title="Input"
      outputs={["output"]}
    >
      <div>Input Node</div>
    </BaseNode>
  );
}

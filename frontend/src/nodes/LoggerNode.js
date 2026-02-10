import BaseNode from "./BaseNode";

export default function LoggerNode({ id, data }) {
  return (
    <BaseNode
      title="Logger"
      inputs={["input"]}
      outputs={[]}
    >
      <div>Logger Node</div>
    </BaseNode>
  );
}

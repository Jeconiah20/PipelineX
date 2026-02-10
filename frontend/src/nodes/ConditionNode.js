import BaseNode from "./BaseNode";

export default function ConditionNode({ id, data }) {
  return (
    <BaseNode
      title="Condition"
      inputs={["input"]}
      outputs={["true", "false"]}
    >
      <div>Condition Node</div>
    </BaseNode>
  );
}

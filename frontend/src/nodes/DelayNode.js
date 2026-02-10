import BaseNode from "./BaseNode";

export default function DelayNode({ id, data }) {
  return (
    <BaseNode
      title="Delay"
      inputs={["trigger"]}
      outputs={["done"]}
    >
      <div>Delay Node</div>
    </BaseNode>
  );
}
 
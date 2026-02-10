import BaseNode from "./BaseNode";

export default function APIRequestNode({ id, data }) {
  return (
    <BaseNode
      title="API Request"
      inputs={["request"]}
      outputs={["response"]}
    >
      <div>API Request Node</div>
    </BaseNode>
  );
}

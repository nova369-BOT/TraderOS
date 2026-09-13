import { useParams } from "react-router-dom";

import { RelationshipGraph } from "../components/graph/RelationshipGraph";

/**
 * Relationship Graph surface — `/markets/relationships` or `/markets/relationships/:ticker`.
 */
export default function RelationshipsPage() {
  const { ticker } = useParams<{ ticker?: string }>();
  return <RelationshipGraph ticker={ticker ?? null} />;
}

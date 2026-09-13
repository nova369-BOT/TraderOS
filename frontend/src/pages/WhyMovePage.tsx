import { useParams } from "react-router-dom";

import { WhyDidThisMove } from "../components/intelligence/WhyDidThisMove";

/**
 * Movement Intelligence surface — route wrapper.
 * `/markets/why` (uses global context) or `/markets/why/:ticker`.
 */
export default function WhyMovePage() {
  const { ticker } = useParams<{ ticker?: string }>();
  return <WhyDidThisMove ticker={ticker ?? null} />;
}

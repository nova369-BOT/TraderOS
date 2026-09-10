import { useParams } from "react-router-dom";

import { WhyDidThisMove } from "../components/intelligence/WhyDidThisMove";

/**
 * Movement Intelligence surface — route wrapper.
 * `/equity/why` (uses global context) or `/equity/why/:ticker`.
 */
export default function WhyMovePage() {
  const { ticker } = useParams<{ ticker?: string }>();
  return <WhyDidThisMove ticker={ticker ?? null} />;
}

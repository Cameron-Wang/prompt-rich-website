import type { Metadata } from "next";
import { Experience } from "./Experience";

export const metadata: Metadata = {
  title: "Thailand Commerce Partners — MCN × Commerce × Consulting",
  description:
    "A concept website for a Thailand-based commerce, creator and consulting partner.",
  other: {
    "codex-preview": "development",
  },
};

export default function Home() {
  return <Experience />;
}

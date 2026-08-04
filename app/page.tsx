import type { Metadata } from "next";
import { Experience } from "./Experience";

const title = "Prompt Rich — Thailand Brand, Commerce & Growth";
const description =
  "Brand strategy, TikTok Shop operations, performance media, creators and Thailand market-entry support.";
const publicOrigin = "https://cameron-wang.github.io/prompt-rich-website";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: publicOrigin,
    images: [
      {
        url: `${publicOrigin}/og-documentary-v1.png`,
        width: 1200,
        height: 630,
        alt: "Prompt Rich — Turn brand desire into daily sales.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${publicOrigin}/og-documentary-v1.png`],
  },
};

export default function Home() {
  return <Experience />;
}

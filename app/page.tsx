import type { Metadata } from "next";
import { headers } from "next/headers";
import { Experience } from "./Experience";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "Prompt Rich — Thailand Brand, Commerce & Growth";
  const description =
    "Brand strategy, TikTok Shop operations, performance media, creators and Thailand market-entry support.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: `${origin}/og.png`,
          width: 1200,
          height: 630,
          alt: "Prompt Rich — From attention to revenue.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${origin}/og.png`],
    },
  };
}

export default function Home() {
  return <Experience />;
}

import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Prompt Rich experience and direct-client wall", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Prompt Rich — Thailand Brand, Commerce &amp; Growth<\/title>/i);
  assert.match(html, /From attention/);
  assert.match(html, /Direct client experience/);
  assert.match(html, /Estée Lauder/);
  assert.match(html, /BASICS BY SITA/);
  assert.match(html, /ลูกสาวคุณนาย/);
  assert.match(html, /\/clients\/orzenic\.png/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

test("ships all approved client assets and responsive logo-wall styling", async () => {
  const [experience, css, clientFiles] = await Promise.all([
    readFile(new URL("../app/Experience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readdir(new URL("../public/clients/", import.meta.url)),
  ]);

  assert.equal(clientFiles.length, 39);
  assert.ok(clientFiles.includes("basics-by-sita.jpg"));
  assert.ok(clientFiles.includes("yg.jpg"));
  assert.ok(clientFiles.includes("orzenic.png"));
  assert.match(experience, /const clientRows = \[clients\.slice\(0, 20\), clients\.slice\(20\)\]/);
  assert.match(experience, /className="client-logo-card"/);
  assert.match(experience, /key=\{`service-\$\{index\}`\}/);
  assert.match(experience, /key=\{`proof-\$\{index\}`\}/);
  assert.match(experience, /\}, \[language\]\);/);
  assert.match(css, /\.client-logo-frame img/);
  assert.match(css, /animation-direction:\s*reverse/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);

  await assert.rejects(access(new URL("../app/_sites-preview/", import.meta.url)));
});

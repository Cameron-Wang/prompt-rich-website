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
  assert.match(html, /The market is moving/);
  assert.match(html, /฿1\.8T/);
  assert.match(html, /Offline → online/);
  assert.match(html, /Five growth levers/);
  assert.match(html, /Prompt Rich commerce growth system/);
  assert.match(html, /External client evidence/);
  assert.match(html, /52M\+/);
  assert.match(html, /ILLUSTRATIVE VISUAL MODEL/);
  assert.match(html, /฿14\.96M/);
  assert.match(html, /39/);
  assert.match(html, /Direct client brands/);
  assert.match(html, /Direct client experience/);
  assert.match(html, /Estée Lauder/);
  assert.match(html, /BASICS BY SITA/);
  assert.match(html, /ลูกสาวคุณนาย/);
  assert.match(html, /\/clients\/orzenic\.png/);
  assert.doesNotMatch(html, /\bMCN\b|\bTAP\b|Affiliate/);
  assert.doesNotMatch(html, /Kannika Chutrakul|Cameron Wang|Rachapol Kamhomgul|Nuttamol Traiupok/);
  assert.doesNotMatch(html, /class="wordmark-mark">PR/);
  assert.doesNotMatch(html, /Facing a similar growth challenge/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);

  const marketPosition = html.indexOf("The market is moving");
  const servicePosition = html.indexOf("Five growth levers");
  const methodPosition = html.indexOf("Prompt Rich commerce growth system");
  const operatorCasePosition = html.indexOf("Operator proof");
  const externalCasePosition = html.indexOf("External client evidence");
  const evidencePosition = html.indexOf("Evidence at a glance");
  assert.ok(marketPosition < servicePosition);
  assert.ok(servicePosition < methodPosition);
  assert.ok(methodPosition < operatorCasePosition);
  assert.ok(operatorCasePosition < externalCasePosition);
  assert.ok(externalCasePosition < evidencePosition);
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
  assert.match(experience, /className="service-system"/);
  assert.match(experience, /className="section-shell client-case-grid"/);
  assert.match(experience, /setScalePreview/);
  assert.match(experience, /key=\{`proof-\$\{index\}`\}/);
  assert.match(experience, /\}, \[language\]\);/);
  assert.match(css, /\.client-logo-frame img/);
  assert.match(css, /animation-direction:\s*reverse/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);

  await assert.rejects(access(new URL("../app/_sites-preview/", import.meta.url)));
});

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
  assert.match(html, /Built to be desired/);
  assert.match(html, /Operated to grow/);
  assert.match(html, /฿12\.5M/);
  assert.match(html, /The market is moving/);
  assert.match(html, /THAILAND ORDER FLOW/);
  assert.match(html, /One market\. Millions of movements/);
  assert.match(html, /300M\+/);
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

test("ships approved assets, spatial motion systems and responsive styling", async () => {
  const [experience, visualSystems, css, polish, clientFiles, backgroundFiles, heroFiles, thailandGeoJson] = await Promise.all([
    readFile(new URL("../app/Experience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/VisualSystems.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/polish.css", import.meta.url), "utf8"),
    readdir(new URL("../public/clients/", import.meta.url)),
    readdir(new URL("../public/backgrounds/", import.meta.url)),
    readdir(new URL("../public/hero/", import.meta.url)),
    readFile(new URL("../public/data/thailand-adm1.geojson", import.meta.url), "utf8"),
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
  assert.match(experience, /className="cinema-media cinema-documentary"/);
  assert.match(experience, /\/hero\/prompt-rich-documentary-b11\.webp/);
  assert.match(experience, /<ThailandGrowthMap language=\{language\}/);
  assert.match(experience, /<GrowthField variant="closing"/);
  assert.match(experience, /key=\{`proof-\$\{index\}`\}/);
  assert.match(experience, /\}, \[language\]\);/);
  assert.match(visualSystems, /fetch\(publicAsset\("\/data\/thailand-adm1\.geojson"\)\)/);
  assert.match(visualSystems, /requestAnimationFrame/);
  assert.deepEqual(backgroundFiles.sort(), [
    "bangkok-commerce-v1.jpg",
    "commerce-studio-v1.jpg",
    "thai-materials-v1.jpg",
  ]);
  assert.deepEqual(heroFiles.sort(), [
    "demand-actual-v1.jpg",
    "desire-actual-v1.jpg",
    "growth-actual-v1.jpg",
    "prompt-rich-documentary-b11.png",
    "prompt-rich-documentary-b11.webp",
  ]);
  assert.match(css, /\.client-logo-frame img/);
  assert.match(css, /bangkok-commerce-v1\.jpg/);
  assert.match(css, /commerce-studio-v1\.jpg/);
  assert.match(css, /thai-materials-v1\.jpg/);
  assert.match(css, /animation-direction:\s*reverse/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(polish, /@keyframes cinema-panel-reveal/);
  assert.match(polish, /@keyframes documentary-image-settle/);
  assert.match(polish, /\.hero-stats/);
  assert.equal(JSON.parse(thailandGeoJson).features.length, 77);

  await assert.rejects(access(new URL("../app/_sites-preview/", import.meta.url)));
  await access(new URL("../public/og-documentary-v1.png", import.meta.url));
  await access(new URL("../public/hero/desire-actual-v1.jpg", import.meta.url));
  await access(new URL("../public/hero/demand-actual-v1.jpg", import.meta.url));
  await access(new URL("../public/hero/growth-actual-v1.jpg", import.meta.url));
  await access(new URL("../public/hero/prompt-rich-documentary-b11.webp", import.meta.url));
});

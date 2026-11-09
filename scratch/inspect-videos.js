const fetch = globalThis.fetch;

async function run() {
  const res = await fetch('http://localhost:3000/stitchless-cataract-surgery');
  const html = await res.text();
  const watchIdx = html.indexOf('id="watch"');
  const endIdx = html.indexOf('id="faq"');
  if (watchIdx !== -1) {
    const watchHtml = html.substring(watchIdx, endIdx !== -1 ? endIdx : watchIdx + 5000);
    console.log(watchHtml);
  }
}

run().catch(console.error);

const fetch = globalThis.fetch;

async function run() {
  const res = await fetch('http://localhost:3000/stitchless-cataract-surgery');
  const html = await res.text();
  
  console.log('--- WHEN SECTION ---');
  const whenIdx = html.indexOf('id="when"');
  if (whenIdx !== -1) {
    console.log(html.substring(whenIdx, whenIdx + 800));
  }

  console.log('--- JOURNEY SECTION ---');
  const journeyIdx = html.indexOf('id="journey"');
  if (journeyIdx !== -1) {
    console.log(html.substring(journeyIdx, journeyIdx + 800));
  }

  console.log('--- WATCH SECTION ---');
  const watchIdx = html.indexOf('id="watch"');
  if (watchIdx !== -1) {
    console.log(html.substring(watchIdx, watchIdx + 1500));
  }
}

run().catch(console.error);


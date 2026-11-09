const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function capture() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const outDir = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\8dd349c5-0c80-41ac-893a-83ea9886d682';

  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9232',
    '--window-size=1440,900',
    'http://localhost:3000/stitchless-cataract-surgery'
  ]);

  try {
    let targets = null;
    for (let i = 0; i < 20; i++) {
      await sleep(300);
      try {
        targets = await getJson('http://127.0.0.1:9232/json');
        if (targets && targets.length) break;
      } catch (e) {}
    }
    const pageTarget = targets.find(t => t.type === 'page');
    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        const onMsg = (evt) => {
          const resp = JSON.parse(evt.data);
          if (resp.id === id) {
            ws.removeEventListener('message', onMsg);
            resolve(resp.result);
          }
        };
        ws.addEventListener('message', onMsg);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await sleep(2500);

    // 1. Hero
    const ssHero = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'screenshot-cataract-hero-initial.png'), Buffer.from(ssHero.data, 'base64'));

    // 2. Overview (What is a cataract)
    await send('Runtime.evaluate', {
      expression: `document.getElementById('overview').scrollIntoView({ behavior: 'instant', block: 'start' })`
    });
    await sleep(600);
    const ssOverview = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'screenshot-cataract-overview-initial.png'), Buffer.from(ssOverview.data, 'base64'));

    // 3. Eye compare
    await send('Runtime.evaluate', {
      expression: `document.querySelector('[data-figure="eyeCompare"]').scrollIntoView({ behavior: 'instant', block: 'start' })`
    });
    await sleep(600);
    const ssCompare = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'screenshot-cataract-compare-initial.png'), Buffer.from(ssCompare.data, 'base64'));

    // 4. Lens designs
    await send('Runtime.evaluate', {
      expression: `document.querySelector('[data-figure="lensDesigns"]').scrollIntoView({ behavior: 'instant', block: 'start' })`
    });
    await sleep(600);
    const ssLens = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'screenshot-cataract-lens-initial.png'), Buffer.from(ssLens.data, 'base64'));

    console.log('Saved all 4 initial screenshots.');
    ws.close();
  } finally {
    edge.kill();
  }
}

capture().catch(console.error);


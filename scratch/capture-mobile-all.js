const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function testMobileAll() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const outDir = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\8dd349c5-0c80-41ac-893a-83ea9886d682';

  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9237',
    '--window-size=390,844',
    'http://localhost:3000/stitchless-cataract-surgery'
  ]);
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  let targets = null;
  for (let i = 0; i < 20; i++) {
    await sleep(300);
    try {
      targets = await new Promise((res, rej) => http.get('http://127.0.0.1:9237/json', r => {
        let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d)));
      }).on('error', rej));
      if (targets && targets.length) break;
    } catch (e) {}
  }
  const page = targets.find(t => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);
  let id = 1;
  const send = (method, params = {}) => new Promise(r => {
    const cur = id++;
    const fn = e => {
      const resp = JSON.parse(e.data);
      if (resp.id === cur) { ws.removeEventListener('message', fn); r(resp.result); }
    };
    ws.addEventListener('message', fn);
    ws.send(JSON.stringify({ id: cur, method, params }));
  });

  await sleep(1500);

  // Set mobile device metrics
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await sleep(500);

  // 1. Mobile Hero
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, 0)` });
  await sleep(600);
  const ssHero = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(outDir, 'screenshot-cataract-mob-hero-top.png'), Buffer.from(ssHero.data, 'base64'));

  // 2. Mobile Overview
  await send('Runtime.evaluate', {
    expression: `document.getElementById('overview').scrollIntoView({ behavior: 'instant', block: 'start' })`
  });
  await sleep(600);
  const ssOverview = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(outDir, 'screenshot-cataract-mob-overview.png'), Buffer.from(ssOverview.data, 'base64'));

  // 3. Mobile Eye Compare
  await send('Runtime.evaluate', {
    expression: `document.querySelector('[data-figure="eyeCompare"]').scrollIntoView({ behavior: 'instant', block: 'start' })`
  });
  await sleep(600);
  const ssCompare = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(outDir, 'screenshot-cataract-mob-compare.png'), Buffer.from(ssCompare.data, 'base64'));

  // 4. Mobile Lens Designs
  await send('Runtime.evaluate', {
    expression: `document.querySelector('.lens-fg').scrollIntoView({ behavior: 'instant', block: 'start' })`
  });
  await sleep(600);
  const ssLens = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(outDir, 'screenshot-cataract-mob-lens.png'), Buffer.from(ssLens.data, 'base64'));

  ws.close();
  edge.kill();
  console.log('Done mobile screenshots');
}

testMobileAll().catch(console.error);


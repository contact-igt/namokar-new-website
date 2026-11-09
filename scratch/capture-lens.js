const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testLens() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9235',
    '--window-size=1440,1100',
    'http://localhost:3000/stitchless-cataract-surgery'
  ]);
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  let targets = null;
  for (let i = 0; i < 20; i++) {
    await sleep(300);
    try {
      targets = await new Promise((res, rej) => http.get('http://127.0.0.1:9235/json', r => {
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
  await sleep(2000);
  await send('Runtime.evaluate', {
    expression: 'document.querySelector(".lens-fg").scrollIntoView({ behavior: "instant", block: "center" })'
  });
  await sleep(600);
  const ss = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:/Users/admin/.gemini/antigravity/brain/8dd349c5-0c80-41ac-893a-83ea9886d682/screenshot-cataract-lens-detail.png', Buffer.from(ss.data, 'base64'));
  ws.close();
  edge.kill();
  console.log('Done lens detail');
}
testLens().catch(console.error);

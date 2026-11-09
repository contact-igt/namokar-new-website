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
    '--remote-debugging-port=9244',
    '--window-size=1440,900',
    'http://localhost:3000/stitchless-cataract-surgery'
  ]);

  try {
    let targets = null;
    for (let i = 0; i < 25; i++) {
      await sleep(300);
      try {
        targets = await getJson('http://127.0.0.1:9244/json');
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

    // Desktop 1440x900
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await sleep(500);

    // 1. When Section (desktop)
    await send('Runtime.evaluate', {
      expression: 'document.getElementById("when").scrollIntoView({ behavior: "instant", block: "start" });'
    });
    await sleep(800);
    const ssWhen = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'screenshot-cataract-when-desktop.png'), Buffer.from(ssWhen.data, 'base64'));
    console.log('Saved screenshot-cataract-when-desktop.png');

    // 2. Journey Section (desktop)
    await send('Runtime.evaluate', {
      expression: 'document.getElementById("journey").scrollIntoView({ behavior: "instant", block: "start" });'
    });
    await sleep(800);
    const ssJourney = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'screenshot-cataract-journey-desktop.png'), Buffer.from(ssJourney.data, 'base64'));
    console.log('Saved screenshot-cataract-journey-desktop.png');

    // 3. Watch Section (desktop)
    await send('Runtime.evaluate', {
      expression: 'document.getElementById("watch").scrollIntoView({ behavior: "instant", block: "start" });'
    });
    await sleep(800);
    const ssWatch = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'screenshot-cataract-watch-desktop.png'), Buffer.from(ssWatch.data, 'base64'));
    console.log('Saved screenshot-cataract-watch-desktop.png');

    // Tablet 820x1180
    await send('Emulation.setDeviceMetricsOverride', {
      width: 820,
      height: 1180,
      deviceScaleFactor: 1,
      mobile: false
    });
    await sleep(500);

    await send('Runtime.evaluate', {
      expression: 'document.getElementById("watch").scrollIntoView({ behavior: "instant", block: "start" });'
    });
    await sleep(800);
    const ssWatchTab = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'screenshot-cataract-watch-tablet.png'), Buffer.from(ssWatchTab.data, 'base64'));
    console.log('Saved screenshot-cataract-watch-tablet.png');

    // Mobile 390x844
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await sleep(500);

    // Mobile When
    await send('Runtime.evaluate', {
      expression: 'document.getElementById("when").scrollIntoView({ behavior: "instant", block: "start" });'
    });
    await sleep(800);
    const ssWhenMob = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'screenshot-cataract-when-mobile.png'), Buffer.from(ssWhenMob.data, 'base64'));
    console.log('Saved screenshot-cataract-when-mobile.png');

    // Mobile Journey
    await send('Runtime.evaluate', {
      expression: 'document.getElementById("journey").scrollIntoView({ behavior: "instant", block: "start" });'
    });
    await sleep(800);
    const ssJourneyMob = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'screenshot-cataract-journey-mobile.png'), Buffer.from(ssJourneyMob.data, 'base64'));
    console.log('Saved screenshot-cataract-journey-mobile.png');

    // Mobile Watch
    await send('Runtime.evaluate', {
      expression: 'document.getElementById("watch").scrollIntoView({ behavior: "instant", block: "start" });'
    });
    await sleep(800);
    const ssWatchMob = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'screenshot-cataract-watch-mobile.png'), Buffer.from(ssWatchMob.data, 'base64'));
    console.log('Saved screenshot-cataract-watch-mobile.png');

    ws.close();
  } finally {
    edge.kill();
  }
}

capture().then(() => {
  console.log('All captures complete!');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});


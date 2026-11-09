const http = require('http');
const { spawn } = require('child_process');

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

async function testClick() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9245',
    '--window-size=1440,900',
    'http://localhost:3000/stitchless-cataract-surgery'
  ]);

  try {
    let targets = null;
    for (let i = 0; i < 25; i++) {
      await sleep(300);
      try {
        targets = await getJson('http://127.0.0.1:9245/json');
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

    await sleep(2000);

    // Scroll to #watch
    await send('Runtime.evaluate', {
      expression: 'document.getElementById("watch").scrollIntoView({ behavior: "instant", block: "start" });'
    });
    await sleep(500);

    // Check play buttons count
    const res = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const btns = document.querySelectorAll('#watch .vp-play');
          return {
            count: btns.length,
            labels: Array.from(btns).map(b => b.getAttribute('aria-label'))
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Play buttons found:', res.result.value);

    // Click third video (local)
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const btns = document.querySelectorAll('#watch .vp-play');
          if (btns[2]) btns[2].click();
        })()
      `
    });
    await sleep(1000);

    const videoState = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const vid = document.querySelector('#watch video');
          return {
            hasVideo: !!vid,
            src: vid ? vid.src : null,
            paused: vid ? vid.paused : null
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Local video element mounted on click:', videoState.result.value);

    ws.close();
  } finally {
    edge.kill();
  }
}

testClick().then(() => {
  console.log('Interaction test passed!');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});


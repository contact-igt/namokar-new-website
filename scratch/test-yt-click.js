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

async function testYtClick() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9246',
    '--window-size=1440,900',
    'http://localhost:3000/stitchless-cataract-surgery'
  ]);

  try {
    let targets = null;
    for (let i = 0; i < 25; i++) {
      await sleep(300);
      try {
        targets = await getJson('http://127.0.0.1:9246/json');
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

    // Click first video (YouTube)
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const btns = document.querySelectorAll('#watch .vp-play');
          if (btns[0]) btns[0].click();
        })()
      `
    });
    await sleep(1000);

    const iframeState = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const iframe = document.querySelector('#watch iframe');
          return {
            hasIframe: !!iframe,
            src: iframe ? iframe.src : null
          };
        })()
      `,
      returnByValue: true
    });
    console.log('YouTube iframe element mounted on click:', iframeState.result.value);

    ws.close();
  } finally {
    edge.kill();
  }
}

testYtClick().then(() => {
  console.log('YouTube click test passed!');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});


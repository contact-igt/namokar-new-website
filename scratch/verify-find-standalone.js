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

async function verify() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const outDir = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\8dd349c5-0c80-41ac-893a-83ea9886d682';

  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9230',
    '--window-size=1440,900',
    'http://localhost:3000/international-patients'
  ]);

  try {
    let targets = null;
    for (let i = 0; i < 20; i++) {
      await sleep(300);
      try {
        targets = await getJson('http://127.0.0.1:9230/json');
        if (targets && targets.length) break;
      } catch (e) {}
    }
    const pageTarget = targets.find(t => t.type === 'page');
    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

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

    const audit = await send('Runtime.evaluate', {
      expression: `(() => {
        const section = document.getElementById('find');
        const cardsGrid = section.querySelector('.find-cards-grid');
        const note = section.querySelector('.find-contact-note');
        const link = note ? note.querySelector('a') : null;
        const addressCard = section.querySelector('.find-card--address');
        const actionGroup = section.querySelector('.find-actions-group');
        const actionCards = Array.from(section.querySelectorAll('.find-action-card'));

        const noteCs = note ? window.getComputedStyle(note) : null;
        const noteRect = note ? note.getBoundingClientRect() : null;
        const actionRect = actionGroup ? actionGroup.getBoundingClientRect() : null;
        const addressRect = addressCard ? addressCard.getBoundingClientRect() : null;

        const linkCs = link ? window.getComputedStyle(link) : null;

        return {
          noteExists: !!note,
          noteParentClass: note ? note.parentElement.className : null,
          noteTagName: note ? note.tagName : null,
          noteText: note ? note.innerText.trim() : null,
          hasCardWrapper: !!section.querySelector('.find-card--contact'),
          bg: noteCs ? noteCs.backgroundColor : null,
          border: noteCs ? noteCs.border : null,
          boxShadow: noteCs ? noteCs.boxShadow : null,
          padding: noteCs ? noteCs.padding : null,
          margin: noteCs ? noteCs.margin : null,
          color: noteCs ? noteCs.color : null,
          fontSize: noteCs ? noteCs.fontSize : null,
          linkText: link ? link.innerText : null,
          linkHref: link ? link.getAttribute('href') : null,
          linkUnderline: linkCs ? linkCs.textDecorationLine : null,
          linkUnderlineColor: linkCs ? linkCs.textDecorationColor : null,
          leftAlignment: {
            addressLeft: addressRect?.left,
            actionGroupLeft: actionRect?.left,
            noteLeft: noteRect?.left,
            isNeatlyAligned: Math.abs((actionRect?.left || 0) - (noteRect?.left || 0)) < 2
          },
          topSpacing: noteRect && actionRect ? (noteRect.top - actionRect.bottom) : null
        };
      })()`,
      returnByValue: true
    });

    console.log('AUDIT RESULT:', JSON.stringify(audit.result?.value || audit, null, 2));

    // Capture screenshot of #find section
    await send('Runtime.evaluate', {
      expression: `document.getElementById('find').scrollIntoView({ behavior: 'instant', block: 'start' })`
    });
    await sleep(600);

    const ss = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'screenshot-find-standalone-text.png'), Buffer.from(ss.data, 'base64'));
    console.log('Saved screenshot-find-standalone-text.png');

    // Mobile screenshot
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await sleep(300);
    await send('Runtime.evaluate', {
      expression: `document.getElementById('find').scrollIntoView({ behavior: 'instant', block: 'start' })`
    });
    await sleep(600);
    const ssMob = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'screenshot-find-standalone-mob.png'), Buffer.from(ssMob.data, 'base64'));
    console.log('Saved screenshot-find-standalone-mob.png');

    ws.close();
  } finally {
    edge.kill();
  }
}

verify().catch(console.error);

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
    '--remote-debugging-port=9236',
    '--window-size=1440,900',
    'http://localhost:3000/stitchless-cataract-surgery'
  ]);

  try {
    let targets = null;
    for (let i = 0; i < 20; i++) {
      await sleep(300);
      try {
        targets = await getJson('http://127.0.0.1:9236/json');
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

    // Audit the 4 sections
    const audit = await send('Runtime.evaluate', {
      expression: `(() => {
        // 1. Hero
        const hero = document.querySelector('.cataract-hero');
        const heroStage = hero ? hero.querySelector('.cataract-hero-image-stage') : null;
        const heroImg = hero ? hero.querySelector('.cataract-hero-bg-img') : null;
        const heroTitle = hero ? hero.querySelector('.page-title')?.innerText : null;
        const heroEyebrow = hero ? hero.querySelector('.page-eyebrow')?.innerText : null;
        const heroLead = hero ? hero.querySelector('.page-lead')?.innerText : null;

        // 2. Overview
        const overview = document.getElementById('overview');
        const overviewLeft = overview ? overview.querySelector('.cataract-overview-left') : null;
        const overviewRight = overview ? overview.querySelector('.cataract-overview-right') : null;
        const overviewImg = overviewLeft ? overviewLeft.querySelector('img') : null;
        const overviewHead = overviewLeft ? overviewLeft.querySelector('.h2')?.innerText : null;
        const overviewKicker = overviewLeft ? overviewLeft.querySelector('.kicker')?.innerText : null;
        const overviewParas = overviewRight ? Array.from(overviewRight.querySelectorAll('p')).map(p => p.innerText.substring(0, 30)) : [];
        const leftRect = overviewLeft ? overviewLeft.getBoundingClientRect() : null;
        const rightRect = overviewRight ? overviewRight.getBoundingClientRect() : null;

        // 3. EyeCompare
        const eyecmp = document.querySelector('.eyecmp');
        const panels = eyecmp ? Array.from(eyecmp.querySelectorAll('.eyecmp-panel')) : [];
        const panelStyles = panels.map(p => {
          const cs = window.getComputedStyle(p);
          const strong = p.querySelector('strong');
          const strongCs = strong ? window.getComputedStyle(strong) : null;
          return {
            title: strong?.innerText,
            bg: cs.backgroundColor,
            border: cs.border,
            borderRadius: cs.borderRadius,
            headingColor: strongCs?.color
          };
        });

        // 4. LensDesigns
        const lensCards = Array.from(document.querySelectorAll('.lens-card'));
        const lensData = lensCards.slice(0, 3).map(c => {
          const name = c.querySelector('.lens-card-name')?.innerText;
          const tag = c.querySelector('.lens-card-tag')?.innerText;
          const title = c.querySelector('.lens-card-title')?.innerText;
          const points = Array.from(c.querySelectorAll('.lens-point-item, .lens-card-points li')).map(li => {
            const icon = li.querySelector('.lens-point-icon');
            const iconRect = icon ? icon.getBoundingClientRect() : null;
            const liRect = li.getBoundingClientRect();
            return {
              text: li.innerText.trim(),
              iconLeft: iconRect?.left,
              liLeft: liRect.left
            };
          });
          const cta = c.querySelector('.lens-card-cta');
          const ctaRect = cta ? cta.getBoundingClientRect() : null;
          const cRect = c.getBoundingClientRect();
          return {
            name,
            tag,
            title,
            pointsCount: points.length,
            points,
            ctaBottomOffset: cRect.bottom - (ctaRect?.bottom || 0)
          };
        });

        return {
          hero: {
            exists: !!hero,
            hasStage: !!heroStage,
            imgSrc: heroImg?.src,
            title: heroTitle,
            eyebrow: heroEyebrow,
            lead: heroLead
          },
          overview: {
            exists: !!overview,
            head: overviewHead,
            kicker: overviewKicker,
            hasImageInLeft: !!overviewImg,
            parasCount: overviewParas.length,
            verticalStartAligned: Math.abs((leftRect?.top || 0) - (rightRect?.top || 0)) < 2
          },
          eyeCompare: {
            panelsCount: panels.length,
            panelStyles
          },
          lensDesigns: {
            visibleCards: lensData.length,
            lensData
          }
        };
      })()`,
      returnByValue: true
    });

    console.log('AUDIT RESULT:', JSON.stringify(audit.result?.value || audit, null, 2));

    // Capture screenshots
    // 1. Hero
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, 0)` });
    await sleep(600);
    const ssHero = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'screenshot-cataract-hero-new.png'), Buffer.from(ssHero.data, 'base64'));

    // 2. Overview
    await send('Runtime.evaluate', {
      expression: `document.getElementById('overview').scrollIntoView({ behavior: 'instant', block: 'start' })`
    });
    await sleep(600);
    const ssOverview = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'screenshot-cataract-overview-new.png'), Buffer.from(ssOverview.data, 'base64'));

    // 3. Eye compare
    await send('Runtime.evaluate', {
      expression: `document.querySelector('[data-figure="eyeCompare"]').scrollIntoView({ behavior: 'instant', block: 'start' })`
    });
    await sleep(600);
    const ssCompare = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'screenshot-cataract-compare-new.png'), Buffer.from(ssCompare.data, 'base64'));

    // 4. Lens designs
    await send('Runtime.evaluate', {
      expression: `document.querySelector('.lens-fg').scrollIntoView({ behavior: 'instant', block: 'center' })`
    });
    await sleep(600);
    const ssLens = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'screenshot-cataract-lens-new.png'), Buffer.from(ssLens.data, 'base64'));

    // 5. Mobile Hero & Overview
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await sleep(500);
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, 0)` });
    await sleep(600);
    const ssMobHero = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'screenshot-cataract-mob-hero.png'), Buffer.from(ssMobHero.data, 'base64'));

    await send('Runtime.evaluate', {
      expression: `document.getElementById('overview').scrollIntoView({ behavior: 'instant', block: 'start' })`
    });
    await sleep(600);
    const ssMobOverview = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'screenshot-cataract-mob-overview.png'), Buffer.from(ssMobOverview.data, 'base64'));

    console.log('Saved all new screenshots!');
    ws.close();
  } finally {
    edge.kill();
  }
}

verify().catch(console.error);


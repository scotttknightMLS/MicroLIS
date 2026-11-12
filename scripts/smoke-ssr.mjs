import assert from 'node:assert/strict';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

try {
  const { default: App } = await vite.ssrLoadModule('/src/App.tsx');
  const bb = renderToString(React.createElement(App, { department: 'bloodBank' }));
  const micro = renderToString(React.createElement(App, { department: 'microbiology' }));

  assert.match(bb, /Blood Bank Historical Record Check/i, 'Blood Bank workup missing');
  assert.match(bb, /EXM|Computer Crossmatch/, 'Blood Bank EXM workflow missing');
  assert.doesNotMatch(bb, /Direct Smear \/ Gram Stain Examination/, 'Microbiology workup leaked into Blood Bank');

  assert.match(micro, /Direct Smear \/ Gram Stain Examination/, 'Microbiology smear workup missing');
  assert.match(micro, /Clinical Microbiology/, 'Microbiology heading missing');
  assert.doesNotMatch(micro, /Blood Bank Historical Record Check/, 'Blood Bank workup leaked into Microbiology');

  console.log('SSR smoke tests passed: distinct Blood Bank and Microbiology page contents.');
} finally {
  await vite.close();
}

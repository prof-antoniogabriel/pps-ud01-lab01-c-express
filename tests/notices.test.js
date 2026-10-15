import test from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/app.js';

async function withServer(fn) {
  const server = app.listen(0);
  try {
    await new Promise((resolve) => server.once('listening', resolve));
    const { port } = server.address();
    await fn(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve, reject) => server.close((err) => err ? reject(err) : resolve()));
  }
}

test('GET /health responde correctamente', async () => {
  await withServer(async (base) => {
    const response = await fetch(`${base}/health`);
    assert.equal(response.status, 200);
    assert.equal((await response.json()).status, 'ok');
  });
});

test('GET /api/notices devuelve una lista', async () => {
  await withServer(async (base) => {
    const response = await fetch(`${base}/api/notices`);
    assert.equal(response.status, 200);
    assert.ok(Array.isArray(await response.json()));
  });
});

test('POST /api/notices valida los datos y crea un aviso', async () => {
  await withServer(async (base) => {
    const bad = await fetch(`${base}/api/notices`, { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify({title:'',severity:'critical'}) });
    assert.equal(bad.status, 400);
    const good = await fetch(`${base}/api/notices`, { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify({title:'Comprobar firewall',severity:'low'}) });
    assert.equal(good.status, 201);
    assert.equal((await good.json()).title, 'Comprobar firewall');
  });
});

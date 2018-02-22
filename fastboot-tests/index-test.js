/* eslint-env node */

const FastBoot = require('fastboot');
const { execFileSync } = require('child_process');
const { module: Qmodule, test } = require('qunit');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const express = require('express');

// build the application
execFileSync('node', ['./node_modules/.bin/ember', 'build']);

let visitOptions = {
  request: { headers: { host: 'localhost:4201' } }
};

Qmodule('Fastboot', function(hooks) {
  let fastboot;
  let server;

  hooks.before(async function() {
    fastboot = new FastBoot({
      distPath: 'dist',
      resilient: false
    });

    let app = express();
    server = app.listen(4201);
  });

  hooks.after(async function() {
    server.close();
  });

  test('A fastboot rendered app should display loadAll data fetched by the server', async function(assert) {
    assert.ok(true);
    let page = await fastboot.visit('/', visitOptions);
    let html = await page.html();
    let dom = new JSDOM(html);
    let h1 = dom.window.document.querySelector('h1');

    assert.equal(h1.textContent.trim(), 'I am the Dummy app');
  });

});

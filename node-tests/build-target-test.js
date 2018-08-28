const fs = require('fs');
const path = require('path');
let { createBuilder, createTempDir } = require('broccoli-test-helper');
let expect = require('chai').expect;
let EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
let EmberApp = require('ember-cli/lib/broccoli/ember-app');
const _resetTreeCache = require('ember-cli/lib/models/addon')._resetTreeCache;
const ADDON_ROOT = path.resolve(__dirname, '..');

function loadScenario(input, scenario) {
  input.write(require(`./fixtures/${scenario}/application`)());
  fs.symlinkSync(path.join(ADDON_ROOT, 'node_modules'), path.join(input.path(), 'node_modules'));
  fs.symlinkSync(ADDON_ROOT, path.join(input.path(), 'ember-cli-tailwind'));
  process.chdir(path.join(input.path(), 'application'));
  process.env.EMBER_ENV = 'development';
}

describe('build target', function() {
  this.timeout(10000);
  let cwd;
  let input;
  let output;

  beforeEach(async function () {
    cwd = process.cwd();
    input = await createTempDir();
  });

  afterEach(async function() {
    process.chdir(cwd);
    _resetTreeCache();
    await input.dispose();
    await output.dispose();
  });

  it(`builds for applications`, async () => {
    loadScenario(input, 'app-with-tailwind');

    let app = new EmberApp();
    output = createBuilder(app.toTree());
    await output.build();

    let files = output.read();
    expect(files.assets).to.have.property('tailwind.css');
    expect(files.assets['tailwind.css']).to.contain('.text-ember-red');
  });

});

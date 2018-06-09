let { createBuilder } = require('broccoli-test-helper');
let expect = require('chai').expect;
let EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
// let _ = require('lodash');
const _resetTreeCache = require('ember-cli/lib/models/addon')._resetTreeCache;

describe('build target', function() {
  this.timeout(10000);

  let cwd;
  beforeEach(function () {
    cwd = process.cwd();
  });

  afterEach(function () {
    process.chdir(cwd);
    _resetTreeCache();
  });

  it(`sets the build target correctly for applications`, async () => {
    // Given an Ember app with app/tailwind directory and config
    process.env.EMBER_ENV = 'development';
    let addon = new EmberAddon({}, {
      'ember-cli-tailwind': {
        buildTarget: 'dummy'
      }
    });

    // When I build the app
    let output = createBuilder(addon.toTree());
    await output.build();

    // Then I get an included tailwind.css
    let files = output.read();
    let assets = files.assets;

    expect(assets).to.have.property('tailwind.css');
    // expect(assets['tailwind.css']).to.contain('example css');
  });

});

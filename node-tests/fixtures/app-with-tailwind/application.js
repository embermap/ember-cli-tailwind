// const fs = require('fs');
const fixturify = require('fixturify')
const path = require('path');
// const ADDON_ROOT = path.resolve(__dirname, '..', '..', '..');

module.exports = function() {
  return {
    application: {
      app: {
        styles: {
          'app.css': ''
        },
        tailwind: fixturify.readSync(path.join(__dirname, './tailwind')),
        'index.html': ''
      },
      config: {
        'environment.js': "module.exports = function() { return { modulePrefix: 'application' } };"
      },
      tests: {
        'index.html': ''
      },
      'ember-cli-build.js': 'module.exports = function() { return { } };',
      'package.json': JSON.stringify({
        name: 'application',
        devDependencies: {
          'ember-cli': '*',
          'ember-cli-babel': '*',
          'ember-cli-htmlbars': '*',
          'ember-engines': '*',
          'ember-source': '*',
          'loader.js': '*'
        },
        'ember-addon': {
          paths: ['../ember-cli-tailwind']
        }
      }),
    }
  }
};

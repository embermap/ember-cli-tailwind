const fs = require('fs');
const fixturify = require('fixturify')
const path = require('path');
const ADDON_ROOT = path.resolve(__dirname, '..', '..', '..');

module.exports = function() {
  return {
    application: {
      app: {
        styles: {
          'app.css': ''
        },
        'index.html': ''
      },
      config: {
        'environment.js': "module.exports = function() { return { modulePrefix: 'application' } };"
      },
      tests: {
        dummy: {
          config: {
          },
          app: {
            styles: {
              'app.css': '@import "tailwind.css"; .fixture-style { background: green; }'
            },
            tailwind: fixturify.readSync(path.join(__dirname, './tailwind')),
            templates: {
            },
            'index.html': fs.readFileSync(path.join(ADDON_ROOT, 'tests/dummy/app/index.html'), 'utf8')
          },
          public: {
          }
        },
        'index.html': ''
      },
      'ember-cli-build.js': 'module.exports = function() { return { "ember-cli-tailwind": { buildTarget: "dummy" } } };',
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

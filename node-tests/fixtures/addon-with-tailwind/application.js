const fs = require('fs');
const fixturify = require('fixturify')
const path = require('path');
const ADDON_ROOT = path.resolve(__dirname, '..', '..', '..');

module.exports = function() {
  return {
    application: {
      addon: {
        tailwind: fixturify.readSync(path.join(__dirname, './tailwind')),
      },
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
            templates: {
            },
            'index.html': fs.readFileSync(path.join(ADDON_ROOT, 'tests/dummy/app/index.html'), 'utf8')
          },
          public: {
          }
        },
        'index.html': ''
      },
      'ember-cli-build.js': 'module.exports = function() { return { } };',
      'package.json': JSON.stringify({
        name: 'application',
        dependencies: {
          'ember-cli-tailwind': '*'
        },
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

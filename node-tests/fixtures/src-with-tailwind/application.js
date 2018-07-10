// const fs = require('fs');
const fixturify = require('fixturify')
const path = require('path');

module.exports = function() {
  return {
    application: {
      src: {
        ui: {
          styles: {
            'app.css': ''
          },
          'index.html': ''
        },
        tailwind: fixturify.readSync(path.join(__dirname, './tailwind'))
      },
      config: {
        'environment.js': `module.exports = function() {
          return {
            modulePrefix: 'application',
            'ember-resolver': {
              features: {
                EMBER_RESOLVER_MODULE_UNIFICATION: true
              }
            },
            EmberENV: {
              FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. 'with-controller': true
                'ember-module-unification': true
              },
            }
        } };`
      },
      'ember-cli-build.js': 'module.exports = function() { return { };',
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

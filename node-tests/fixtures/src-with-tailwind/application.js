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
      tests: {
        'index.html': '',
      },
      config: {
        'environment.js': `module.exports = function() {};`
      },
      'ember-cli-build.js': 'module.exports = function() { return {}};',
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

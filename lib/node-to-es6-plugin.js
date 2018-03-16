'use strict';

const BroccoliPlugin = require('broccoli-plugin');
const fs = require('fs');
const path = require('path');
const stringUtils = require("ember-cli-string-utils");

// Takes a tree containing a directory of node CommonJS modules
// and creates a `modules.js` file containing a single ES6 export
// of an object representing each of those original modules
module.exports = class NodeToES6Plugin extends BroccoliPlugin {
  build() {
    this.inputPaths.forEach(inputPath => {
      fs.readdirSync(inputPath).forEach(directory => {
        let modulesPath = path.join(inputPath, directory);
        let modules = fs.readdirSync(modulesPath);

        let data = modules.reduce((data, moduleName) => {
          let modulePath = path.join(modulesPath, moduleName)
          let contents = require(modulePath);
          let key = stringUtils.camelize(moduleName.replace('.js', ''));

          data[key] = contents;

          delete require.cache[require.resolve(modulePath)]

          return data;
        }, {});

        let dataString = JSON.stringify(data);
        let outputPath = path.join(this.outputPath, directory);
        fs.mkdirSync(outputPath);
        fs.writeFileSync(path.join(outputPath, 'modules.js'), `export default ${dataString}`);
      });
    });
  }
}

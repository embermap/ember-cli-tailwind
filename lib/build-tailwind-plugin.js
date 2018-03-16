'use strict';

const BroccoliPlugin = require('broccoli-plugin');
const path = require('path');
const spawnSync = require('child_process').spawnSync;

module.exports = class BuildTailwindPlugin extends BroccoliPlugin {

  build() {
    let tailwindBinary = require.resolve('tailwindcss').replace('index.js', 'cli.js');
    let tailwindPath = path.join(this.inputPaths[0], 'app', 'styles', 'tailwind');
    let configFile = path.join(tailwindPath, 'config', 'tailwind.js');
    let modulesFile = path.join(tailwindPath, 'config', 'modules.css');
    let outputFile = path.join(this.outputPath, 'app', 'styles', 'tailwind.css');

    spawnSync(`${tailwindBinary}`, [`build`, `${modulesFile}`, `-c`, `${configFile}`, `-o`, `${outputFile}`]);
  }

}

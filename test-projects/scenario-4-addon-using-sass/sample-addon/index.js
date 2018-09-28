'use strict';

const Merge = require('broccoli-merge-trees');
const buildTailwind = require('ember-cli-tailwind/lib/build-tailwind');

module.exports = {
  name: 'sample-addon',

  config(env, baseConfig) {
    return Object.assign({}, baseConfig, {
      'ember-cli-tailwind': {
        shouldIncludeStyleguide: false,
        shouldBuildTailwind: false
      }
    });
  },

  treeForAddonStyles(tree) {
    let trees = tree ? [ tree ] : [];

    trees.push(buildTailwind(this));

    return new Merge(trees);
  }
};

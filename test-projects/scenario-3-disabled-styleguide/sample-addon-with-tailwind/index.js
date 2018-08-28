'use strict';

module.exports = {
  name: 'sample-addon-with-tailwind',

  config() {
    return {
      'ember-cli-tailwind': {
        shouldIncludeStyleguide: false
      }
    };
  }
};

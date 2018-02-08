import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { dasherize } from '@ember/string';
import modules from '../ember-cli-tailwind/modules';

export default Controller.extend({

  rawModules: modules,

  /*
    A module style is an object that looks like

    {
      module: 'border-radius',
      name: 'lg',
      value: '.5rem'
    }
  */
  moduleStyles: computed(function() {
    return Object.keys(modules).reduce((allModules, moduleName) => {
      let hash = modules[moduleName];
      allModules[moduleName] = Object.keys(hash).map(key => {
        return {
          module: dasherize(moduleName),
          name: key,
          value: hash[key]
        };
      });

      return allModules;
    }, {});
  })

});

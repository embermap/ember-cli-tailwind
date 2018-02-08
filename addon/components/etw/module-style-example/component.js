import Component from '@ember/component';
import layout from './template';
import classesForModuleStyle from 'ember-cli-tailwind/utils/classes-for-module-style';
import { computed } from '@ember/object';

export default Component.extend({

  layout,
  tagName: '',

  classesForModuleStyle: computed('moduleStyle', function() {
    return classesForModuleStyle(this.get('moduleStyle'));
  })

});

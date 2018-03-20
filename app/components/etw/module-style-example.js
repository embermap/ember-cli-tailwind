import Component from '@ember/component';
import classesForModuleStyle from 'ember-cli-tailwind/utils/classes-for-module-style';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: '',
  etwTailwindStyleguide: service(),

  // Passed in
  moduleStyle: null,

  classesForModuleStyle: computed('moduleStyle', function() {
    return classesForModuleStyle(this.get('moduleStyle'));
  }),

  actions: {
    selectModuleStyle() {
      this.get('etwTailwindStyleguide').set('selectedModuleStyle', this.get('moduleStyle'));
    }
  }

});

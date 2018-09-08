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
    return classesForModuleStyle(this.moduleStyle);
  }),

  actions: {
    selectModuleStyle() {
      this.etwTailwindStyleguide.set('selectedModuleStyle', this.moduleStyle);
    }
  }

});

import Component from '@ember/component';
import { computed } from '@ember/object';
import { later } from '@ember/runloop';
import classesForModuleStyle from 'ember-cli-tailwind/utils/classes-for-module-style';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';

export default Component.extend({
  etwTailwindStyleguide: service(),
  moduleStyle: reads('etwTailwindStyleguide.selectedModuleStyle'),

  activeResponsiveClass: 'all',
  activeState: 'none',

  detailStyles: computed('moduleStyle', 'activeResponsiveClass', 'activeState', function() {
    let moduleStyle = this.get('moduleStyle');
    let activeResponsiveClass = this.get('activeResponsiveClass');
    let responsivePrefix = activeResponsiveClass === 'all' ? '' : `${activeResponsiveClass}:`;
    let activeState = this.get('activeState');
    let statePrefix = activeState === 'none' ? '' : `${activeState}:`;

    return classesForModuleStyle(moduleStyle).map(cssClass => {
      return `${responsivePrefix}${statePrefix}${cssClass}`;
    });
  }),

  actions: {
    highlightStyle(style) {
      this.set('highlightedStyle', style);
      later(() => {
        this.set('highlightedStyle', null);
      }, 1500);
    }
  }

});

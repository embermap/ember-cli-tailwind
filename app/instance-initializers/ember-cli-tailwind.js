import Router from '../router';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

const TailwindApplicationRoute = Route.extend({
  router: service('-routing'),

  renderTemplate() {
    if (window.location.href.match('/tailwind')) {
      this.render('applicationTailwind', {
        controller: this.controllerFor('applicationTailwind')
      });
    } else {
      this._super(...arguments);
    }
  }
});

export function initialize(appInstance) {
  let fastboot = appInstance.lookup('service:fastboot');
  let fastbootIsInstalled = fastboot;
  let fastbootIsNotInstalled = !fastboot;
  let notUsingFastboot = fastbootIsNotInstalled || (fastbootIsInstalled && !fastboot.get('isFastBoot'));

  if (notUsingFastboot && window.location.href.match('/tailwind')) {
    appInstance.register('route:application', TailwindApplicationRoute);
    Router.map(function() {
      this.route('tailwind');
    });
  }
}

export default {
  initialize
};

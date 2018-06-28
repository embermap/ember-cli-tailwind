import Router from '../router';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

const TailwindApplicationRoute = Route.extend({
  router: service('-routing'),

  renderTemplate() {
    this.render('applicationTailwind', {
      controller: this.controllerFor('applicationTailwind')
    });
  }
});

export function initialize(appInstance) {
  if (!appInstance.lookup) {
    // not compatible with ember 1.13
    return;
  } 

  let fastboot = appInstance.lookup('service:fastboot');
  let fastbootIsInstalled = fastboot;
  let fastbootIsNotInstalled = !fastboot;
  let notUsingFastboot = fastbootIsNotInstalled || (fastbootIsInstalled && !fastboot.get('isFastBoot'));
  let router = appInstance.lookup('service:router')._router;
  let initialURL = router.initialURL || ((window && window.location) ? window.location.href : ''); // fastboot guard :/

  if (notUsingFastboot && initialURL.match('/tailwind')) {
    appInstance.register('route:application', TailwindApplicationRoute);
    Router.map(function() {
      this.route('tailwind');
    });
  }
}

export default {
  initialize
};

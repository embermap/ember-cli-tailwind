import { test } from 'qunit';
import moduleForAcceptance from 'sample-app/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Tailwind config in Addon | Consuming app smoke test');

test(`I can use configured Tailwind utilties and components in my app`, async function(assert) {
  await visit('/');

  let button = find('button')[0];
  let color = window.getComputedStyle(button).getPropertyValue("background-color");

  assert.equal(color, 'rgb(224, 78, 57)');
});

import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Tailwind config in Addon | Dummy app smoke test');

test(`I can import my Tailwind build into my addon.scss file and @extend classes from it`, async function(assert) {
  await visit('/');

  let title = find('h2')[0];
  let color = window.getComputedStyle(title).getPropertyValue("color");

  assert.equal(color, 'rgb(224, 78, 57)');
});

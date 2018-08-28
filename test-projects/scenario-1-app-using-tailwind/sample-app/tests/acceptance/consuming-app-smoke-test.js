import { test } from 'qunit';
import moduleForAcceptance from 'sample-app/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Tailwind config in Addon | Consuming app smoke test');

test(`I can use my addon's Tailwind classes in an app`, async function(assert) {
  await visit('/');

  let title = find('h2')[0];
  let color = window.getComputedStyle(title).getPropertyValue("color");

  assert.equal(color, 'rgb(224, 78, 57)');
});

test(`I can use my addon's Tailwind components in an app`, async function(assert) {
  await visit('/');

  let button = find('button')[0];
  let bgColor = window.getComputedStyle(button).getPropertyValue("background-color");
  assert.equal(bgColor, 'rgb(224, 78, 57)');

  let textColor = window.getComputedStyle(button).getPropertyValue("color");
  assert.equal(textColor, 'rgb(255, 255, 255)');
});

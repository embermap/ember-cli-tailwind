import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Tailwind config in Addon | Dummy app smoke test');

test(`I can import my Tailwind build into my addon.scss file and @extend classes from it`, async function(assert) {
  await visit('/');

  let title = find('h2')[0];
  let color = window.getComputedStyle(title).getPropertyValue("color");

  assert.equal(color, 'rgb(224, 78, 57)');
});

test(`The tailwind build is only included once`, async function(assert) {
  let vendorStyleSheet = [].slice.call(document.styleSheets)
    .find(sheet => sheet.href.match('vendor.css'));

  let flexRules = [].slice.call(vendorStyleSheet.cssRules)
    .filter(rule => (rule.selectorText && rule.selectorText === ".flex"));

  assert.equal(flexRules.length, 1);
});

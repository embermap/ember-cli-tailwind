import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Tailwind config in Addon, disabled styleguide | Dummy app smoke test');

test(`The styleguide & related assets are not included in my dummy app`, async function(assert) {
  await visit('/');

  // Crude way to check that we haven't imported etw.css, which is used for the /tailwind styleguide route.
  let styleguideRule = [...document.styleSheets].find(sheet => {
    return [...sheet.rules].find(rule => {
      let selector = rule.selectorText || '';

      return selector.match(/^\.etw-/);
    });
  });

  assert.notOk(!!styleguideRule);
});

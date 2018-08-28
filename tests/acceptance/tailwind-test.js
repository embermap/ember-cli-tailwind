import { visit } from '@ember/test-helpers';
import { module, skip } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | tailwind styleguide', function(hooks) {
  setupApplicationTest(hooks);

  skip('The Tailwind styleguide renders', async function(assert) {
    await visit('/tailwind');

    assert.dom('h1').hasText('Your Tailwind styles');
  });
});

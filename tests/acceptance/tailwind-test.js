import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | tailwind styleguide');

test('The Tailwind styleguide renders', function(assert) {
  visit('/tailwind');

  andThen(function() {
    assert.equal(find('h1').text().trim(), 'Your Tailwind styles');
  });
});

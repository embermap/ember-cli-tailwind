/* eslint-env node */
let expect = require('chai').expect;
let EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
let _ = require('lodash');

describe('import files', function() {
  afterEach(() => {
    delete process.env.EMBER_ENV;
  });

  ['development', 'test'].forEach(environment => {
    it(`includes styleguide styles by default in non-production environments (${environment})`, () => {
      process.env.EMBER_ENV = environment;
      let addon = new EmberAddon({}, {
        'ember-cli-tailwind': {
          buildTarget: 'app'
        }
      });
      expect(_.values(addon._styleOutputFiles)[0]).to.include('vendor/etw.css');
    });
  })

  it('excludes styleguide styles by default in the production environment', () => {
    process.env.EMBER_ENV = 'production';
    let addon = new EmberAddon({}, {
      'ember-cli-tailwind': {
        buildTarget: 'app'
      }
    });
    expect(_.values(addon._styleOutputFiles)[0]).to.not.include('vendor/etw.css');
  });

  describe('shouldIncludeStyleguide', function() {
    ['development', 'test', 'production'].forEach(environment => {
      it(`includes styleguide styles when enabled (${environment})`, () => {
        process.env.EMBER_ENV = environment
        let addon = new EmberAddon({}, {
          'ember-cli-tailwind': {
            buildTarget: 'app'
          },
          configPath: 'tests/fixtures/config/environment-styleguide-enabled'
        });
        expect(_.values(addon._styleOutputFiles)[0]).to.include('vendor/etw.css');
      });
    });

    ['development', 'test', 'production'].forEach(environment => {
      it(`excludes styleguide styles when disabled (${environment})`, () => {
        process.env.EMBER_ENV = environment
        let addon = new EmberAddon({}, {
          'ember-cli-tailwind': {
            buildTarget: 'app'
          },
          configPath: 'tests/fixtures/config/environment-styleguide-disabled'
        });
        expect(_.values(addon._styleOutputFiles)[0]).to.not.include('vendor/etw.css');
      });
    });
  });

});

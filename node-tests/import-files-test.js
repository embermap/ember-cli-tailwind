let { createBuilder } = require('broccoli-test-helper');
let expect = require('chai').expect;
let EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
let _ = require('lodash');

describe('import files', function() {
  this.timeout(10000);

  afterEach(() => {
    delete process.env.EMBER_ENV;
  });

  ['development', 'test'].forEach(environment => {
    it(`includes styleguide styles by default in non-production environments (${environment})`, async () => {
      process.env.EMBER_ENV = environment;
      let addon = new EmberAddon();
      expect(_.values(addon._styleOutputFiles)[0]).to.include('vendor/etw.css');

      let output = createBuilder(addon._processedAppTree());
      await output.build();
      expect(output.read()).to.have.nested.property(
        'dummy.instance-initializers.ember-cli-tailwind\\.js'
      );
    });
  })

  it('excludes styleguide styles by default in the production environment', async () => {
    process.env.EMBER_ENV = 'production';
    let addon = new EmberAddon();
    expect(_.values(addon._styleOutputFiles)[0]).to.not.include('vendor/etw.css');

    let output = createBuilder(addon._processedAppTree());
    await output.build();
    expect(output.read()).not.to.have.nested.property(
      'dummy.instance-initializers.ember-cli-tailwind\\.js'
    );
  });

  describe('shouldIncludeStyleguide', function() {
    ['development', 'test', 'production'].forEach(environment => {
      it(`includes styleguide styles when enabled (${environment})`, async () => {
        process.env.EMBER_ENV = environment
        let addon = new EmberAddon({}, {
          configPath: 'tests/fixtures/config/environment-styleguide-enabled'
        });
        expect(_.values(addon._styleOutputFiles)[0]).to.include('vendor/etw.css');

        let output = createBuilder(addon._processedAppTree());
        await output.build();
        expect(output.read()).to.have.nested.property(
          'dummy.instance-initializers.ember-cli-tailwind\\.js'
        );
      });
    });

    ['development', 'test', 'production'].forEach(environment => {
      it(`excludes styleguide styles when disabled (${environment})`, async () => {
        process.env.EMBER_ENV = environment
        let addon = new EmberAddon({}, {
          configPath: 'tests/fixtures/config/environment-styleguide-disabled'
        });
        expect(_.values(addon._styleOutputFiles)[0]).to.not.include('vendor/etw.css');

        let output = createBuilder(addon._processedAppTree());
        await output.build();
        expect(output.read()).not.to.have.nested.property(
          'dummy.instance-initializers.ember-cli-tailwind\\.js'
        );
      });
    });
  });

});

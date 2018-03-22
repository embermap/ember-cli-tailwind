/* eslint-env node */
'use strict';

const fs = require('fs');

module.exports = {
  description: '',

  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall(options) {
    return this._insertImportIntoAppCss(options);
  },

  _insertImportIntoAppCss(options) {
    let baseDir = options.dummy ? 'tests/dummy/app/styles' : 'app/styles';
    let text;
    let appStylesFile;

    if (fs.existsSync(`${baseDir}/app.css`)) {
      appStylesFile = 'app.css';
      text = "@import 'tailwind.css'";

    } else if (fs.existsSync(`${baseDir}/app.scss`)) {
      appStylesFile = 'app.scss';
      text = "@import 'tailwind'";
    }

    let appStylesPath = `${baseDir}/${appStylesFile}`;

    // The import isn't necessary for addons, as tailwind will automatically
    // be concatenated into vendor.css
    if (fs.existsSync(appStylesPath)) {
      let contents = fs.readFileSync(appStylesPath, 'utf8');

      if (!contents.match(text)) {
        fs.writeFileSync(appStylesPath, `${text};\n\n${contents}`, 'utf8');
      }
    }

    // Couldn't get this to insert the text at the top of file
    // return this.insertIntoFile('app/styles/app.css', text);
  }
};

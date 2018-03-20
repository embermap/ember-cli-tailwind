/* eslint-env node */

var fs = require('fs');

module.exports = {
  description: '',

  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall() {
    return this._insertImportIntoAppCss();
  },

  _insertImportIntoAppCss: function() {
    var text;
    var appStylesFile;

    if (fs.existsSync('app/styles/app.css')) {
      appStylesFile = 'app.css';
      text = "@import 'tailwind.css'";

    } else if (fs.existsSync('app/styles/app.scss')) {
      appStylesFile = 'app.scss';
      text = "@import 'tailwind'";
    }

    var appStylesPath = `app/styles/${appStylesFile}`;

    // The import isn't necessary for addons, as tailwind will automatically
    // be concatenated into vendor.css
    if (fs.existsSync(appStylesPath)) {
      var contents = fs.readFileSync(`app/styles/${appStylesFile}`, 'utf8');

      if (!contents.match(text)) {
        fs.writeFileSync(`app/styles/${appStylesFile}`, `${text};\n\n${contents}`, 'utf8');
      }
    }

    // Couldn't get this to insert the text at the top of file
    // return this.insertIntoFile('app/styles/app.css', text);
  }
};

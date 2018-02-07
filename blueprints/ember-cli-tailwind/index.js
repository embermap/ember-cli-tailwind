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
    var text = "@import 'tailwind.css'";
    var line = `${text};\n\n`
    var contents = fs.readFileSync('app/styles/app.css', 'utf8');

    if (!contents.match(text)) {
      fs.writeFileSync('app/styles/app.css', `${line}${contents}`, 'utf8');
    }

    // Couldn't get this to insert the text at the top of file
    // return this.insertIntoFile('app/styles/app.css', text);
  }
};

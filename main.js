var insert = require('gulp-insert');

var replaceRegExp = /(\s|^)(let |var |const ) *sibling.*?\;/;

module.exports = function(myself, sibling) {
  return insert.transform(function(contents) {
    return contents.replace(replaceRegExp, function(match, headSpace, type) {
      return headSpace+
        type+'siblingPathSep = require("path").sep;'+
        type+'sibling = require(__dirname.split(siblingPathSep).reverse()'+
          '.map(function(dir) {'+
            'if (this.found && dir == "'+myself+'") {'+
              'return dir;'+
            '} else {'+
              'this.found = true;'+
              'return "'+sibling+'";'+
            '}'+
          '}, {})'+
          '.reverse().join(siblingPathSep) + __filename);';
    });
  });
};

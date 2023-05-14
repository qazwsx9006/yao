const _ = require("lodash");
const fs = require("fs");

function loadFolderAllFiles(path, params = {}) {
  let { skip: skipRegexp } = params;
  if (skipRegexp && !_.isRegExp(skipRegexp))
    skipRegexp = new RegExp(skipRegexp);
  let results = [];
  fs.readdirSync(path, { withFileTypes: true }).map((file) => {
    const fileName = file.name;
    if (skipRegexp && skipRegexp.test(fileName)) return;
    if (file.isDirectory()) {
      const files = loadFolderAllFiles(`${path}/${file.name}`, params);
      results.push(files);
    } else {
      results.push(require(`${path}/${fileName}`));
    }
  });
  return _.flatten(results);
}

module.exports = { loadFolderAllFiles };

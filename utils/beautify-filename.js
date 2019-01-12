const _ = require('lodash');

module.exports.beautifiedFileName = filename => {
  const newFileName = filename
    .replace('.js', '')
    .split('-')
    .map(fragment => _.capitalize(fragment))
    .join('');
  return newFileName;
};

const { default: env } = require('start-env');
const { default: files } = require('start-files');
const { default: standard } = require('start-standard');

const { start } = require('start-standard-preset');

const lint = () => start(
  env('NODE_ENV', 'test'),
  files([ 'lib/**/*.js', 'test/**/*.js' ]),
  standard('semistandard', { ignore: ['templates'] })
);
const prepush = () => start(
  lint
);

module.exports = { start, lint, prepush };

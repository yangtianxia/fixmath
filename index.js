'use strict';

if (process.env.ENV_NODE === 'production') {
  module.exports = require('./dist/fixmath.min.js')
} else {
  module.exports = require('./dist/fixmath.js')
}
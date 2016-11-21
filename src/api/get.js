'use strict'
const getValue = require('./../fn/getValue')


/**
 * get
 *
 * Gets a value
 */
module.exports = db => path => {
  return getValue(db, path)
}

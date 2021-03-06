'use strict'
const jsonPatch = require('fast-json-patch')
const getValue = require('./../fn/getValue')
const nestingPatches = require('./../fn/nestingPatches')
const decomposePath = require('./../fn/decomposePath')
const uniq = require('uniq')
const flatten = require('./../fn/flatten')
const triggerListener = require('./../fn/triggerListener')


console.log('Implement https://github.com/mafintosh/is-my-json-valid')
console.log('Although something like this would be nicer and more efficient https://www.npmjs.com/package/joi-validate-patch')

console.error('Make patch polymorphic')
/*
db.patch({
  op: 'add',
  path: '/foo/bar',
  value: 123
})

db.patch('add', '/foo/bar', 123)

db.patch([
  { .. },
  { .. }
])
*/

/**
 * patch
 *
 * Applies a patch
 */
module.exports = db => patch => {
  if (patch instanceof Array === false) {
    patch = [patch]
  }

  // Check if root exists for add operations
  patch.forEach(x => {
    let path = x.path.split('/')
    path = path.slice(0, path.length - 1).join('/')

    if (x.op === 'add' && getValue(db.static, path) === undefined) {
      let patches = nestingPatches(db.static, x.path)
      jsonPatch.apply(db.static, patches)
    }
  })

  let errors = jsonPatch.apply(db.static, patch)

  console.log(errors)

  let trigger = []

  patch.forEach(x => {
    let parts = decomposePath(x.path)
    parts.push(x.path)
    parts.forEach(y => {
      if (db.updates.triggers[y]) {
        trigger.push(db.updates.triggers[y])
      }
    })
  })

  trigger = flatten(trigger)
  trigger = uniq(trigger)

  trigger.map(x => {
    triggerListener(db, x)
  })

}

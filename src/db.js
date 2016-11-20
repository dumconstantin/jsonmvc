'use strict'
const jsonPatch = require('fast-json-patch')
const R = require('ramda')

const parsePath = R.pipe(
  R.replace(/\s/g, ''),
  R.replace(/~0/g, '~'),
  R.replace(/~1/g, '/'),
  R.split('/'),
  R.tail
)

let db = {
  foo: {
    bar: {
    }
  }
}

let listeners = {}
let schema = {}
let nodes = {}

const callListeners = paths => {

  let paths2 = paths.map(parsePath)

  let found = R.map(x => {
    let stack = []
    let result = []
    let n
    let i
    let t

    let first = R.keys(nodes)
    stack.push([first])

    while (stack.length > 0) {
      n = stack.pop()
      for (i = 0; i < n.length; i += 1) {
        t = R.path(n[i], nodes)

        if (t) {
          if (t._isDynamic) {
            if (t.paths.indexOf(x) !== -1) {
              result.push(n[i])
            }
          } else {
            R.keys(t).map(y => {
              stack.push(n[i].push(y))
            })
          }
        }
      }
    }

    console.log('Result is', result)

  }, paths)

  console.log('Found', found)
}

const apply = patch => {

  if (R.not(R.is(Array, patch))) {
    patch = [patch]
  }

  let errors = jsonPatch.validate(patch, db)

  if (errors !== undefined) {
    console.log(errors)
    throw errors
  } else {

    jsonPatch.apply(db, patch)
    callListeners(R.map(x => x.path, patch))
  }

}

const getDynamic = path => {
  let path2 = parsePath(path)
  let node = R.path(path2, nodes)

  let args = R.map(x => {
    return get(x)
  }, node.paths)

  let result = node.fn.apply(null, args)

  return result
}

const get = path => {
  let path2 = parsePath(path)

  // if it's dynamic
  if (R.path(path2, nodes) !== undefined) {
    return getDynamic(path)
  } else {
    return R.path(path2, db)
  }

}

const on = (path, fn) => {
  let path2 = parsePath(path)

  if (R.path(path2, listeners) === undefined) {
    listeners = R.assocPath(path2, [], listeners)
  }

  R.path(path2, listeners).push(fn)
}

const node = o => {
  let path = parsePath(o.path)
  nodes = R.assocPath(path, {
    _isDynamic: true,
    paths: o.paths,
    fn: o.fn
  }, nodes)
}

const useSchema = rawSchema => {

}

module.exports = {
  apply: apply,
  get: get,
  on: on,
  node: node,
  schema: useSchema
}

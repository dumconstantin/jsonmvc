'use strict'
const decomposePath = require('./decomposePath')

// Implement https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm for faster search

function uniq(a) {
  var seen = {};
  var out = [];
  var len = a.length;
  var j = 0;
  for(var i = 0; i < len; i++) {
    var item = a[i];
    if(seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = item;
    }
  }
  return out;
}

function fn(deps) {
  let extDeps = Object
    .keys(deps)
    .reduce((acc, x) => {
      let nodeDeps = deps[x]
      acc[x] = nodeDeps

      decomposePath(x).map(y => {
        acc[y] = nodeDeps
      })

      return acc
    }, {})

  let parents = Object.keys(extDeps)

  let willVisit = parents.reduce((acc, x) => {
    acc[x] = false
    return acc
  }, {})

  let isCyclic = false

  parent:
  for (let i = 0; i < parents.length; i += 1) {
    let visited = Object.assign({}, willVisit)
    let parent = parents[i]
    let children = extDeps[parent].slice()

    while (children.length > 0) {
      let child = children.shift()

      if (extDeps[child]) {
        if (visited[child]) {
          isCyclic = true
          break parent
        } else {
          visited[child] = true
          children = children.concat(extDeps[child])
          children = uniq(children)
        }
      } else {
        // Its a static node so we don't care
      }
    }
  }

  return isCyclic
}

module.exports = fn

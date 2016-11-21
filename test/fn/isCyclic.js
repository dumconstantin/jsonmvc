var isCyclic = require('./../src/isCyclic')

var d = {
  'a': {
    nodes: ['b', 'c']
  },
  'b': {
    nodes: ['e']
  },
  'c': {
    nodes: ['g']
  },
  'e': {
    nodes: ['f']
  },
  'f': {
    nodes: ['g']
  }
}

console.log(isCyclic(d))

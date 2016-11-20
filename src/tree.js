
var fn = () => {}

var nodes = {
  a: {
    b: {
      c: 123,
      e: {
        d: 'a'
      }
    }
  },
  b: {
    e: {
      f: '123'
    }
  }
}

var dynamic = {
  '/foo/bar/baz': {

  },
  '/foo/bam/bam': {

  }
  a: {
    c: {
      args: ['/a/b/c', '/b/e'],
      fn: fn
    }
  },
  b: {
    d: {
      args: ['/a/c', '/b/e/f'],
      fn: fn
    }
  }
}

var listeners = {
  a: {
    c: [fn],
    b: {
      c: [fn]
    }
  }
}

patch -> '/a/b/c'

make up the list of dynamic nodes listening to '/a/b/c'
then use this list to get the dynamic nodes listening to those nodes - until none are found
then with this comprehensive list check if any corresponds to a path in the listeners
if it does then call the function with the value of the node (be it essential or dynamic)




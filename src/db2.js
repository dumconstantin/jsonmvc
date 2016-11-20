
var fn = () => {}

var staticNodes = {
  foo2: '123',
  bam1: '123',
  boo: {
    bar: {
      baz: '123
    }
  }
}

var dynamicNodes = {
  '/foo/bar/baz': {
    nodes: ['/foo1', '/foo2'],
    fn: fn
  },
  '/foo1': {
    nodes: ['/bam1'],
    fn: fn
  },
  '/boo/poo': {
    nodes: ['/foo2'],
    fn: fn
  }
}

var dynamicNodesCache = {
  '/foo': ['/foo/bar/baz'],
  '/foo/bar': ['/foo/bar/baz'],
  '/boo': ['/boo/poo']
}

var extended = merge(essential, dynamic)

// Final extended tree is locked and can't be altered - only leafs can be added
// in the exteneded tree dynamic nodes look like above to check if a node is 
// dynamic just check the fn property to be a function - functions can't be added
// through patches

var listeners = {
  '/foo/bar/baz': {
    fn: [fn]
  },
  '/bam1': {
    fn: [fn]
  },
  '/boo': {
    fn: [fn]
  }
}

var triggers = {
  '/bam1': ['/bam1', '/foo/bar/baz']
  '/foo2': ['/foo/bar/baz'],
  '/boo': ['/boo']
}

var updates = [
  '/bam1',
  '/boo/bar/baz'
]

'/bam1'
'/boo/bar/baz'
'/boo/bar'
'/boo'


// If the developer needs a stream for:
db.on('/foo/bar')
// then it can give it the observable of his likeing and
// the db will use that stream
db.stream = Kefir
db.stream = RxJS

// If no stream is provided then a function is returned
// that can be given at a later time
// but the listner will be in effect only when something
// has registered (e.g. a callback or a stream)

// Promises can't be implemented because many calls will be
// made from that stream

// - for each update, split until root
// - find all the listeners that need to be informed of those updates using the tiggers hash
// - for each path of a listener do:
// - 1. if the path is a dynamic node, call the dynamic node and return the result
// - 2. if the path is a static node
// - - - clone the static node entirely
// - - - get and call all dynamicNodes under that path
// - - - merge the cloned node with the dynamicNodes result
// - call each listener with the result
//
// - - - get the static nodes it is listening to and clone them
// - - - get the dynamic nodes it is listening to and repeat the procedure
// - - - after all content has been cloned, call each dynamic node one by one until

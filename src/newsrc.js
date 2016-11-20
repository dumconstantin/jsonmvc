
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

var dynamicNodesLocations = {
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

var listenersTriggers = {
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


// However, the callback needs to be unsubsribed
let subscribe = db.on('/foo/bar')
let unsubscribe = watcher(fn)
unsubscribe()

// Actually instead of providing ways to augment the 
// stream with observables a wrapper would be much better
// something similar to
Kefir.fromCallback(db.on('/foo/bar'))
// but in the implementation the unsubscribe case
// needs to be considered

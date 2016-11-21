
/**
 * on
 *
 * Adds a listener
 *
 * - when a listener is first added a check is made
 *   on the path and if it exists then the listener
 *   is executed (async!)
 */
module.exports = db => (path, fn) => {

  if (!listeners[path]) {
    listeners[path] = {
      fn: []
    }
  }

  listeners[path].fn.push(fn)

}

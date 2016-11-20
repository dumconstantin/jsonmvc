
// Default db
// - "/schema/errors"
// dynamic node mounded so that actions or other
// nodes can listen to when the data is incompatible with the schema
// and has errors
//
// also instead of adding another method to the
// exposed api the developer can use db.get("/schema/errors")
// when it needs it


// triggerPath(path)
// ------
// Triggers an update at the given path
// informing all listeners of the new values
//
// 1. Unless at root, generated all paths until root
// 2. Match all listenersTriggers to get the listeners
// 3. For each listener get its nodeValue
// 4. Call each fn with the value


// nodeValue(path)
// ------
// Get the value at the given path regardless if its
// a dynamic or static node
//
// 1. if is a dynamic node then get nodeValue for each of its node
// 2. call the fn with the value args
// 3. return the result
//
// 4. else clone the static node
// 5  get all dynamic nodes beneath that path (using dynamicNodesLocation) and get their nodeValue
// 6. append the results to the cloned object
// 7. return the result


// findStatic(path)
// ------
// Find all the static paths that when changed will influence
// the given path
//
// 1. if path is a static node then return [path]
// 2. else findStatic on the nodes of the dynamic nodes
// 3. flatten the result and return


// unsubscribe(path)
// ------
// Removes a listener from the given path
// Once called it needs to make sure synchronusely
// that no other process will call the listener until finished
//
// 1. remove it from listeners
// 2. remote it from the 'listenersTriggers'


// addListener(path, fn)
// ------
// Creates a listener on the given path
// which will call the fn with the updated value
//
// 1. create a listener at the path in "listeners"
// 2. findStatic at the given path and add them to "listenersTriggers"
// 3. return unsubscribe(path) function


// checkCyclic(parent, children)
// ------
// Checks if at the new mounted path there will be a cyclic
// relation with it's children


// addDynamicNode(path, paths, fn)
// ------
// Create a new dynamic node
//
// 1. checkCyclic tree at the given path with the nodes
// 2. add an entry in "dynamicNodes"
// 2. generate all the paths from the path to the root and add them to "dynamicNodesLocations"


// applyPatch(patches)
// ------
// Apply one or more patches
//
// 1. if patches if not an array make it one
// 2. verify each patch for errors before applying (allow data format errors but not schema errors)
// 3. apply patches to db
// 4. triggerPath on each affected path

// pathExists(path)
// -----
// Checks if a given path exists

// -----
// Exposed api
// -----
// on: addListener
// get: nodeValue
// has: pathExists
// patch: applyPatch

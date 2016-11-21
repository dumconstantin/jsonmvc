'use strict'
module.exports = xs => {
  let seen = {};
  let out = [];
  let j = 0;

  for (let i = 0, len = xs.length; i < len; i += 1) {
    let item = xs[i];

    if (!seen[item]) {
      seen[item] = true;
      j += 1
      out[j] = item;
    }
  }
  return out
}

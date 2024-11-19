import chain from 'stream-chain';
// or: const chain = require('stream-chain');

import zlib from 'node:zlib';
import {Transform} from 'node:stream';

// ISSUE:
// If the length of the array passed to chain is arbitrary, there is no error.
// If the length of the array is more than one, an error occurs.
// This was not an error in version 3.1.0 or earlier.

// this chain object will work on a stream of numbers
const pipeline = chain([
  // transforms a value
  x => x * x,

  // returns several values
  x => chain.many([x - 1, x, x + 1]),

  // returns multiple values with a generator
  function* (x) {
    for (let i = x; i > 0; --i) {
      yield i;
    }
    return 0;
  },

  // filters out even values
  x => x % 2 ? x : null,

  // uses an arbitrary transform stream
  new Transform({
    objectMode: true,
    transform(x, _, callback) {
      callback(null, x + 1);
    }
  }),

  // transform to strings
  x => '' + x,

  // compress
  zlib.createGzip()
]);

// the chain object is a regular stream
// it can be used with normal stream methods

// log errors
pipeline.on('error', error => console.log(error));

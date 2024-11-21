import chain from 'stream-chain';

import StreamJson from 'stream-json'
import Pick from 'stream-json/filters/Pick'
const { parser } = StreamJson

const chainValue = Pick.withParser({ filter: '' })
const parserValue = parser()

let sw = true // or false
const chainOrParserValue = sw ? chainValue : parserValue

const pipeline = chain([

  // A value of type Chain. This is OK.
  chainValue,
  // A value of type Parser. This is OK.
  parserValue,

  // union of Chain and Parser types, it is an error.
  // chainOrParserValue,

] as const);

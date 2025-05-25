"use strict"

const bufferFn = () => new Uint32Array(1024)

const getBufferSize = (buffer) => buffer.length * 32

module.exports = {
  bufferFn,
  getBufferSize,
}
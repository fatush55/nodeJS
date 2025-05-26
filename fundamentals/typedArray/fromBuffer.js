"use strict"

const buffer = new ArrayBuffer(10)

const uint8Array = new Uint8Array(buffer)
const uint16Array = new Uint16Array(buffer)



for (let i = 0; i < 10; i++) {
  uint8Array[i] = i
}

console.dir({ uint8Array, uint16Array }, { depth: null })
console.dir({ uint8Array: uint8Array.length, uint16Array: uint16Array.length }, { depth: null })
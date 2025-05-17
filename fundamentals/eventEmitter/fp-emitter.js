"use strict"

const eventEmitter  = (listenersMap = {}) => ({
  on: (name, fn) => ((listenersMap[name] = listenersMap[name] || []).push(fn)),
  emit: (name, ...data) => ((listenersMap[name] || []).forEach(listeners => listeners(data))),
})


const emitter = eventEmitter()

emitter.on("data", (err) => {
  console.log("data", err)
})

emitter.emit("data", "error")
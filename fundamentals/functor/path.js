"use strict"

const { readFile } = require("node:fs")

const fp = {}

fp.maybe = (value) => (fn) => fp.maybe(value && fn ? fn(value) : null)

fp.path = (data) => (path) => (
  fn.maybe(path)(path =>
    path.split(".")
      .reduce(
        (acc, key) => acc[key] || {},
        data || {},
      )
  )
)

fp.path = data => path => (
  fp.maybe(path) (path => (
    path.split('.')
      .reduce(
        (prev, key) => (prev[key] || {}),
        (data || {})
      )
  )
))

const config = {
  db: {
    config: {
      path: "./db.config.js"
    }
  }
}

fp.path(config)('db.config.path')((file) => {
  readFile(file, "utf8", (err, data) => {
    fp.maybe(data)(console.log)
  })
})

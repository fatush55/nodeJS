"use strict"

const fibFn = (n) => (n <= 2 ? 1 : fibFn(n - 1) + fibFn(n - 2))

module.exports = {
  fibFn
}
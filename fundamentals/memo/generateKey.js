"use strict"

const { createHash } = require("crypto")

const getValueKey = (value) => value.toString() + ":" + typeof value

const generateKey = (args) => args.map(getValueKey).join("|")

const generateKeyHash = (args) => {
  const key = generateKey(args)

  return createHash("sha256").update(key).digest("hex")
}

module.exports = {
  generateKey,
  generateKeyHash
}
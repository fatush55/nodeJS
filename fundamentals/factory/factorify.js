"use strict"

class User {
  constructor(name, email) {
    this.name = name
    this.email = email
  }
}

const factorify = Category => (...args) => new Category(...args)

const UserFactory = factorify(User)

const user1 = UserFactory("Dima", "<EMAIL>")
const user2 = UserFactory("Dima 2", "<EMAIL_2>")

console.log("user1", user1)
console.log("user2", user2)
"use strict"

const User = class {
  constructor(name, email) {
    this.name = name
    this.email = email
  }
}

const Admin = class {
  constructor(email) {
    this.email = email
  }
}

const mixin = (SuperClass) => class extends SuperClass {
  constructor(phone, ...superArgs) {
    super(...superArgs)

    this.phone = phone
  }
}

const UserWithPhone = mixin(User)
const AdminWithPhone = mixin(Admin)

const user = new UserWithPhone("+380991234567", "Dima", "<EMAIL>")
const admin = new AdminWithPhone("+380991234567", "<EMAIL>")

console.log(user)
console.log(admin)
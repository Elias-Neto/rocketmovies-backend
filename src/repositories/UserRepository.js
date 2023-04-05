const knex = require("../database/knex")

class UserRepository {
  async findByEmail(email) {
    const user = await knex("users").where({ email }).first()

    return user
  }

  async createUser({ name, email, password }) {
    const user = await knex("users").insert({
      name,
      email,
      password,
    })

    return user
  }
}

module.exports = UserRepository

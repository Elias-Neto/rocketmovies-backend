const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const { hash, compare } = require("bcryptjs")
const UserRepository = require("../repositories/UserRepository")
const UserCreateService = require("../services/UserCreateService")

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body

    const userRepository = new UserRepository()
    const userCreateService = new UserCreateService(userRepository)

    await userCreateService.execute({ name, email, password })

    response.status(201).json()
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body
    const id = request.user.id

    const user = await knex("users").where({ id }).first()

    if (!user) {
      throw new AppError("Usuário não encontrado!")
    }

    if (email) {
      const userWithUpdatedEmail = await knex("users").where({ email }).first()

      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
        throw new AppError("Este e-mail já está em uso!")
      }
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if (password && !old_password) {
      throw new AppError("Informe a senha antiga!")
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError("Sua senha antiga não confere!")
      }

      user.password = await hash(password, 8)
    }

    await knex("users").where({ id }).first().update({
      name: user.name,
      email: user.email,
      password: user.password,
      updated_at: knex.fn.now(),
    })

    response.json()
  }
}

module.exports = UsersController

const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class UsersAvatarController {
  async update(request, response) {
    const id = request.user.id
    const avatarFilename = request.file.filename

    const diskStorage = new DiskStorage()

    const user = await knex("users").where({ id }).first()

    if (!user) {
      throw new AppError("Somente usuários podem mudar o avatar!", 401)
    }

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar)
    }

    const filename = await diskStorage.saveFile(avatarFilename)
    user.avatar = filename

    await knex("users").where({ id }).first().update(user)

    return response.json(user)
  }
}

module.exports = UsersAvatarController

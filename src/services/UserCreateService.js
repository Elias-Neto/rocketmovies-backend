const AppError = require("../utils/AppError")
const { hash } = require("bcryptjs")

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ name, email, password }) {
    const checkUserExists = await this.userRepository.findByEmail(email)

    if (checkUserExists) {
      throw new AppError("Este e-mail já está em uso!")
    }

    const hashedPassword = await hash(password, 8)

    const user = await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
    })

    return user
  }
}

module.exports = UserCreateService

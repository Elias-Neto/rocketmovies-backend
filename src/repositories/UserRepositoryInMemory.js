class UserRepositoryInMemory {
  users = []

  async findByEmail(email) {
    const user = await this.users.find((user) => user.email === email)

    return user
  }

  async createUser({ name, email, password }) {
    const user = {
      id: Math.floor(Math.random() * 1000) + 1,
      name,
      email,
      password,
    }

    this.users.push(user)

    return user
  }
}

module.exports = UserRepositoryInMemory

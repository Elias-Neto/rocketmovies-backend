class UserRepositoryInMemory {
  users = []

  async findByEmail(email) {
    const user = await this.users.find((user) => user.email === email)

    return user
  }

  async findById(id) {
    const user = await this.users.find((user) => user.id === id)

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

  async updateUser(userUpdated) {
    this.users = this.users.map((user) => {
      if (userUpdated.id === user.id) {
        user = userUpdated
      }

      return user
    })

    return userUpdated
  }
}

module.exports = UserRepositoryInMemory

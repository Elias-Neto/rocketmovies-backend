const AppError = require("../utils/AppError")
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory")
const UserUpdateService = require("../services/UserUpdateService")
const UserCreateService = require("../services/UserCreateService")

describe("UserUpdateService", () => {
  let userRepositoryInMemory
  let userUpdateService
  let userCreateService

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    userUpdateService = new UserUpdateService(userRepositoryInMemory)
    userCreateService = new UserCreateService(userRepositoryInMemory)
  })

  it("user should be update", async () => {
    const user = {
      name: "User Name",
      email: "user@test.com",
      password: "123",
    }

    const { id: user_id } = await userCreateService.execute(user)

    let userUpdated = {
      name: "User Name Update",
      email: "userUpdate@test.com",
      password: "1234",
      old_password: "123",
      id: user_id,
    }

    userUpdated = await userUpdateService.execute(userUpdated)

    expect(userUpdated).toHaveProperty("id")
  })

  it("user not should be update because he don't exists", async () => {
    const userUpdated = {
      name: "User Name",
      email: "user@test.com",
      password: "1234",
      old_password: "123",
      id: 1,
    }

    await expect(userUpdateService.execute(userUpdated)).rejects.toEqual(
      new AppError("Usuário não encontrado!")
    )
  })

  it("user not should be update because email already exists", async () => {
    const userOne = {
      name: "User Name",
      email: "userOne@test.com",
      password: "123",
    }

    const { id: user_id } = await userCreateService.execute(userOne)

    const userTwo = {
      name: "User Name",
      email: "userTwo@test.com",
      password: "123",
    }

    await userCreateService.execute(userTwo)

    const userUpdated = {
      email: "userTwo@test.com",
      id: user_id,
    }

    await expect(userUpdateService.execute(userUpdated)).rejects.toEqual(
      new AppError("Este e-mail já está em uso!")
    )
  })

  it("user not should be update because old password wasn't informed", async () => {
    const user = {
      name: "User Name",
      email: "user@test.com",
      password: "123",
    }

    const { id: user_id } = await userCreateService.execute(user)

    const userUpdated = {
      password: "1234",
      id: user_id,
    }

    await expect(userUpdateService.execute(userUpdated)).rejects.toEqual(
      new AppError("Informe a senha antiga!")
    )
  })

  it("user not should be update because old password not matched", async () => {
    const user = {
      name: "User Name",
      email: "user@test.com",
      password: "123",
    }

    const { id: user_id } = await userCreateService.execute(user)

    const userUpdated = {
      password: "1234",
      old_password: "333",
      id: user_id,
    }

    await expect(userUpdateService.execute(userUpdated)).rejects.toEqual(
      new AppError("Sua senha antiga não confere!")
    )
  })
})

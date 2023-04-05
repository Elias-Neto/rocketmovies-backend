const AppError = require("../utils/AppError")
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory")
const UserCreateService = require("../services/UserCreateService")

describe("UserCreateService", () => {
  let userRepositoryInMemory
  let userCreateService

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    userCreateService = new UserCreateService(userRepositoryInMemory)
  })

  it("user should be create", async () => {
    const user = {
      name: "User Name",
      email: "user@test.com",
      password: "123",
    }

    const userCreated = await userCreateService.execute(user)

    expect(userCreated).toHaveProperty("id")
  })

  it("user not should be create because email already exists", async () => {
    const userOne = {
      name: "User Name",
      email: "user@test.com",
      password: "123",
    }

    const userTwo = {
      name: "User Name",
      email: "user@test.com",
      password: "123",
    }

    await userCreateService.execute(userOne)

    await expect(userCreateService.execute(userTwo)).rejects.toEqual(
      new AppError("Este e-mail já está em uso!")
    )
  })
})

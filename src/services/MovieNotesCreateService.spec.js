const MovieNotesCreateService = require("./MovieNotesCreateService")
const MovieNotesRepositoryInMemory = require("../repositories/MovieNotesRepositoryInMemory")

describe("MoviemovieNotesCreateService", () => {
  let movieNotesCreateService
  let movieNotesRepositoryInMemory

  beforeEach(() => {
    movieNotesRepositoryInMemory = new MovieNotesRepositoryInMemory()
    movieNotesCreateService = new MovieNotesCreateService(movieNotesRepositoryInMemory)
  })

  it("movie note should be create", async () => {
    const note = {
      title: "Título de Exemplo",
      description: "Essa é uma nota de exemplo.",
      rating: 5,
      tags: ["tag1", "tag2"],
    }

    const user_id = Math.floor(Math.random() * 1000) + 1

    const noteCreated = await movieNotesCreateService.execute({ ...note, user_id })

    expect(noteCreated).toHaveProperty("id")
  })
})

const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class MovieNotesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body
    const user_id = request.user.id

    if (rating > 5 || rating < 0) {
      throw new AppError("Rating precisa estar entre 1 e 5!")
    }

    const note_id = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id,
    })

    const tagsInsert = tags.map((name) => {
      return {
        user_id,
        note_id: Number(note_id),
        name,
      }
    })

    await knex("movie_tags").insert(tagsInsert)

    return response.status(201).json()
  }

  async delete(request, response) {
    const { id } = request.params

    await knex("movie_notes").where({ id }).first().delete()

    return response.json()
  }

  async index(request, response) {
    const { title, tags } = request.query
    const user_id = request.user.id

    let movieNotes

    if (tags) {
      const filterTags = tags.split(",").map((tag) => tag.trim())

      movieNotes = await knex("movie_tags")
        .select(["movie_notes.id", "movie_notes.title", "movie_notes.user_id"])
        .innerJoin("movie_notes", "movie_notes.id", "movie_tags.note_id")
        .where("movie_notes.user_id", user_id)
        .whereLike("movie_notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .orderBy("movie_notes.title")
    } else {
      movieNotes = await knex("movie_notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title")
    }

    const userTags = await knex("movie_tags").where({ user_id })
    const movieNotesWithTags = movieNotes.map((note) => {
      const noteTags = userTags.filter((tag) => tag.note_id === note.id)

      return {
        ...note,
        tags: noteTags,
      }
    })

    return response.json(movieNotesWithTags)
  }

  async show(request, response) {
    const { id } = request.params

    const movieNote = await knex("movie_notes").where({ id }).first()

    if (!movieNote) {
      throw new AppError("Nota não encontrada!")
    }

    const movieTags = await knex("movie_tags")
      .where({ note_id: id })
      .orderBy("name")

    return response.json({
      ...movieNote,
      movieTags,
    })
  }
}

module.exports = MovieNotesController

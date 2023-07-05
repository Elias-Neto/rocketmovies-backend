const knex = require("../database/knex")
const MovieTagsRepository = require("../repositories/MovieTagsRepository")

class MovieNotesRepository {
  movieTagsRepository = new MovieTagsRepository()

  async findMovieNoteByID(id) {
    const movieNote = await knex("movie_notes").where({ id }).first()

    const movieTags = await this.movieTagsRepository.findTagsByNoteID(id)

    return {
      ...movieNote,
      movieTags
    }
  }

  async insertMovieNote({ title, description, rating, tags, userID }) {
    const noteID = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id: userID,
    })

    await this.movieTagsRepository.insertTags(tags, noteID, userID)

    return this.findMovieNoteByID(noteID)
  }
}

module.exports = MovieNotesRepository
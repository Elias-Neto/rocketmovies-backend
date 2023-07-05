const MovieTagsRepositoryInMemory = require("../repositories/MovieTagsRepositoryInMemory")

class MovieNotesRepositoryInMemory {
  movieNotes = []
  movieTagsRepositoryInMemory = new MovieTagsRepositoryInMemory()

  async findMovieNoteByID(id) {
    const movieNote = this.movieNotes.find((movieNote) => movieNote.id === id)

    const movieTags = await this.movieTagsRepositoryInMemory.findTagsByNoteID(id)

    return {
      ...movieNote,
      movieTags
    }
  }

  async insertMovieNote({ title, description, rating, tags, userID }) {
    const movieNote = {
      id: Math.floor(Math.random() * 1000) + 1,
      title,
      description,
      rating,
      user_id: userID,
    }

    this.movieNotes.push(movieNote)
    this.movieTagsRepositoryInMemory.insertTags(tags, movieNote.id, userID)

    return this.findMovieNoteByID(movieNote.id)
  }
}

module.exports = MovieNotesRepositoryInMemory
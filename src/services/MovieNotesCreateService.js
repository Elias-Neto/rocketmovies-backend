const AppError = require("../utils/AppError")

class MovieNotesCreateService {
  constructor(movieNotesRepository) {
    this.movieNotesRepository = movieNotesRepository
  }

  async execute({ title, description, rating, tags, user_id }) {
    if (rating > 5 || rating < 0) {
      throw new AppError("Rating precisa estar entre 1 e 5!")
    }

    const movieNote = await this.movieNotesRepository.insertMovieNote({
      title,
      description,
      rating,
      tags,
      user_id
    })

    return movieNote
  }
}

module.exports = MovieNotesCreateService
const knex = require("../database/knex")

class MovieTagsRepository {
  async insertTags(tags, noteID, userID) {
    const insertTags = tags.map((name) => {
      return {
        user_id: userID,
        note_id: Number(noteID),
        name,
      }
    })

    await knex("movie_tags").insert(insertTags)

    return tags
  }

  async findTagsByNoteID(noteID) {
    const movieTags = await knex("movie_tags")
      .where({ note_id: noteID })
      .orderBy("name")

    return movieTags
  }
}

module.exports = MovieTagsRepository
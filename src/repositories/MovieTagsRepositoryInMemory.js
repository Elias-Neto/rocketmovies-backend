class MovieTagsRepositoryInMemory {
  tags = []

  async insertTags(tags, noteID, userID) {
    const insertTags = tags.map((name) => {
      return {
        user_id: userID,
        note_id: Number(noteID),
        name,
      }
    })

    this.tags.push(insertTags)
  }

  async findTagsByNoteID(noteID) {
    const movieTags = this.tags.filter((tag) => tag.note_id === noteID)

    return movieTags
  }
}

module.exports = MovieTagsRepositoryInMemory
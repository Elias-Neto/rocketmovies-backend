const { Router } = require("express")
const userRoutes = require("./user.routes")
const movieNotesRoutes = require("./movieNotes.routes")
const movieTagsRoutes = require("./movieTags.routes")
const sessionsRoutes = require("./sessions.routes")

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/movie_notes", movieNotesRoutes)
routes.use("/movie_tags", movieTagsRoutes)
routes.use("/sessions", sessionsRoutes)

module.exports = routes

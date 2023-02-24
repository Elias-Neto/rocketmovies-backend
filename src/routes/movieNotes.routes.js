const { Router } = require("express")
const MovieNotesController = require("../controllers/MovieNotesController")
const ensureAuthentication = require("../middlewares/ensureAuthentication")

const movieNotesRoutes = Router()
const movieNotesController = new MovieNotesController()

movieNotesRoutes.post("/", ensureAuthentication, movieNotesController.create)
movieNotesRoutes.delete("/:id", movieNotesController.delete)
movieNotesRoutes.get("/", ensureAuthentication, movieNotesController.index)
movieNotesRoutes.get("/:id", movieNotesController.show)

module.exports = movieNotesRoutes

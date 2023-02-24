const { Router } = require("express")
const MovieTagsController = require("../controllers/MovieTagsController")
const ensureAuthentication = require("../middlewares/ensureAuthentication")

const tagRoutes = Router()
const movieTagsController = new MovieTagsController()

tagRoutes.get("/", ensureAuthentication, movieTagsController.show)

module.exports = tagRoutes

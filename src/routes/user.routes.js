const multer = require("multer")
const { Router } = require("express")
const uploadConfig = require("../configs/upload")
const UsersController = require("../controllers/UsersController")
const ensureAuthentication = require("../middlewares/ensureAuthentication")
const UsersAvatarController = require("../controllers/UsersAvatarController")

const userRoutes = Router()
const usersController = new UsersController()
const upload = multer(uploadConfig.MULTER)
const usersAvatarController = new UsersAvatarController()

userRoutes.post("/", usersController.create)
userRoutes.put("/", ensureAuthentication, usersController.update)
userRoutes.patch(
  "/avatar",
  ensureAuthentication,
  upload.single("avatar"),
  usersAvatarController.update
)

module.exports = userRoutes

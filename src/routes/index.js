const { Router } = require("express")
const usersRoutes = require("./users.routes")

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/movie-notes", movieNotesRoutes)
routes.use("/movie-tags", movieTagsRoutes)

module.exports = routes
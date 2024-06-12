const sqliteConnection = require("../database")

class MovieTagsController {
  async index(request, response) {
    const { user_id } = request.query

    const database = await sqliteConnection()

    const movieTags = await database.all(
      `SELECT * FROM movie_tags WHERE user_id = ?`,
      [user_id]
    )

    if (!movieTags) {
      throw new AppError(`No tags found for this user.`)
    }

    return response.json(movieTags)
  }
}

module.exports = MovieTagsController

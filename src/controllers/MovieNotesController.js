const AppError = require("../utils/AppError")
const sqliteConnection = require("../database")

class MovieNotesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body
    const { user_id } = request.params

    const database = await sqliteConnection()

    if (!title || !description || !rating) {
      throw new AppError(
        `All fields (title, description, rating) are required.`
      )
    }

    const note = await database.run(
      `INSERT INTO movie_notes (title, description, rating, user_id) VALUES (?, ?, ?, ?)`,
      [title, description, rating, user_id]
    )

    const note_id = note.lastID

    const tagsInsert = tags.map((name) => {
      note_id, user_id, name
    })

    const insertPromises = tagsInsert.map((tag) =>
      database.run(
        `INSERT INTO movie_tags (note_id, user_id, name) VALUES (?, ?, ?)`,
        [tag.note_id, tag.user_id, tag.name]
      )
    )

    await Promise.all(insertPromises)

    return response.status(201).json()
  }

  async index(request, response) {
    const { user_id } = request.query

    const database =await sqliteConnection()

    const movieNotes = await database.all(
      `SELECT * FROM movie_notes WHERE user_id = ?`,
      [user_id]
    )

    if (!movieNotes) {
      throw new AppError(`No movie notes found for this user.`)
    }

    return response.json(movieNotes)
  }

  async delete(request, response) {
    const { id } = request.params

    const database = await sqliteConnection()

    const note = await database.get(`SELECT * FROM movie_notes WHERE id = ?`, [
      id,
    ])

    if (!note) {
      throw new AppError(`Movie note not found.`)
    }

    await database.run(`DELETE FROM movie_notes WHERE id = ?`, [id])

    return response.status(204).json()
  }
}


module.exports = MovieNotesController
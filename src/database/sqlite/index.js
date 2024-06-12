const sqlite3 = require("sqlite3")
const { open } = require("sqlite")
const createUsers = require("./createUsers")
const createMovieNotes = require("./createMovieNotes")
const createMovieTags = require("./createMovieTags")
const path = require("path")

async function sqliteConnection() {
  const database = await open({
    filename: path.resolve(__dirname, "..", "database.db"),
    driver: sqlite3.Database,
  })

  return database
}

module.exports = sqliteConnection
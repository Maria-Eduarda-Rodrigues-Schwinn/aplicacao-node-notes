const sqliteConnection = require("../../sqlite")
const createUsers = require("./createUsers")
const createMovieNotes = require("./createMovieNotes")
const createMovieTags = require("./createMovieTags")

async function migrationsRun() {
  const schemas = [createUsers, createMovieNotes, createMovieTags]

  sqliteConnection()
    .then((db) => db.exec(schemas))
    .catch((error) => console.log(error))
}

module.exports = migrationsRun
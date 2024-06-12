const createMovieTags = `
  CREATE TABLE IF NOT EXISTS movie_tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    note_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    name VARCHAR NOT NULL,
    FOREIGN KEY (note_id) REFERENCES movie_notes(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`

module.exports = createMovieTags

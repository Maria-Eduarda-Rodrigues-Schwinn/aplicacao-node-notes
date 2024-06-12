exports.up = function (knex) {
  return knex.schema.createTable("movie_tags", (table) => {
    table.increments("id").primary()
    table
      .integer("note_id")
      .unsigned()
      .references("id")
      .inTable("movie_notes")
      .onDelete("CASCADE")
    table.integer("user_id").unsigned().references("id").inTable("users")
    table.text("name")
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable("movie_tags")
}

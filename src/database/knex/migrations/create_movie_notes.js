exports.up = function(knex) {
  return knex.schema.createTable("movie_notes", (table) => {
    table.increments("id").primary()
    table.text("title")
    table.text("description")
    table.integer("rating")
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable("movie_notes")
}

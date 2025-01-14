exports.up = function(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary()
    table.text("name")
    table.text("email").unique()
    table.text("password")
    table.text("avatar")
    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable("users")
}

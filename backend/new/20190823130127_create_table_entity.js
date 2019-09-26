
exports.up = function(knex) {
    return knex.schema.withSchema('atlas').createTable('entities', table =>{
        table.increments('identities').primary()
        table.string('name').notNull()
        table.string('email').unique()
        table.string('cnpj').unique()
        table.timestamp('deleted_at')
        table.timestamp('updated_at')
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('atlas.entities')
}
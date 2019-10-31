
exports.up = function(knex) {
    return knex.schema.withSchema('atlas').createTable('products', table =>{
        table.increments('idproducts').primary()
        table.string('segmento').notNull()
        table.string('produtos').unique()
        table.string('pontos')
        table.timestamp('deleted_at')
        table.timestamp('updated_at')
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('atlas.products')
}
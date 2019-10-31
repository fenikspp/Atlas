
exports.up = function(knex) {
    return knex.schema.alterTable('atlas.sale_for_now', table => {
        table.binary('content').notNull()
    })
}

exports.down = function(knex) {
    return knex.schema.alterTable('atlas.sale_for_now', table => {
        table.dropColumn('content')
    })
}

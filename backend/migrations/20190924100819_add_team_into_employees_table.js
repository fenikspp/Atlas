
exports.up = function(knex) {
    return knex.schema.alterTable('atlas.employees', table => {
        table.integer('team').references('idTeam')
            .inTable('atlas.teams')
    })
}

exports.down = function(knex) {
    return knex.schema.alterTable('atlas.employees', table => {
        table.dropColumn('team')
    })
}

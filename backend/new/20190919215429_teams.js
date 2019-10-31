exports.up = function(knex) {
    return knex.schema.withSchema('atlas').createTable('teams', table =>{
        table.increments('idTeam').primary()
        table.string('name').notNull()
        table.integer('supervisor').references('idemployees')
            .inTable('atlas.employees').unique()
        table.timestamp('deleted_at')
        table.timestamp('updated_at')
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('atlas.teams')
}
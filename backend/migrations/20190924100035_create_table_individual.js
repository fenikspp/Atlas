
exports.up = function(knex) {
    return knex.schema.withSchema('atlas').createTable('individuals', table =>{
        table.increments('idindividuals').primary()
        table.string('name').notNull()
        table.string('userName').notNull()
        table.string('email').unique()
        table.enu('gender', ['m', 'f'])
        table.string('cpf').unique()
        table.string('mother_name')
        table.string('birthday')
        table.timestamp('deleted_at')
        table.timestamp('updated_at')
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('atlas.individuals')
}

exports.up = function(knex) {
    return knex.schema.withSchema('atlas').createTable('employees', table =>{
        table.increments('idemployees').primary()
        table.string('name').notNull()
        table.string('email').unique()
        table.string('userName').unique().notNull()
        table.enu('gender', ['m', 'f'])
        table.string('cpf').unique()
        table.string('password').notNull()
        table.string('birthday')
        table.enu('type', ['admin', 'bko', 'vend']).defaultTo('vend')
        table.timestamp('deleted_at')
        table.timestamp('updated_at')
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('atlas.employees')
}
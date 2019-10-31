
exports.up = function(knex) {
    return knex.schema.withSchema('atlas').createTable('sales', table =>{
        table.increments('idsales').primary()
        table.integer('id_employees').references('idemployees')
            .inTable('atlas.employees')
        table.integer('id_individuals').references('idindividuals')
            .inTable('atlas.individuals')
        table.integer('id_entities').references('identities')
            .inTable('atlas.entities')
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('atlas.sales')
}
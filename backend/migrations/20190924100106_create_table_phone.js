
exports.up = function(knex) {
    return knex.schema.withSchema('atlas').createTable('phones', table =>{
        table.increments('idphones').primary()
        table.integer('ddd')
        table.string('number_res', 12)
        table.string('number_com', 12)
        table.string('number_cel', 12)
        table.integer('id_employees').references('idemployees')
            .inTable('atlas.employees').unique()
        table.integer('id_individuals').references('idindividuals')
            .inTable('atlas.individuals').unique()
        table.integer('id_entities').references('identities')
            .inTable('atlas.entities').unique()
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('atlas.phones')
};

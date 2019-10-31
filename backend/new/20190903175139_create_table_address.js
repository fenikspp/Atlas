
exports.up = function(knex) {
    return knex.schema.withSchema('atlas').createTable('address', table =>{
        table.increments('idaddress').primary()
        table.string('uf', 2).notNull()
        table.string('municipio', 30).notNull()
        table.string('cidade', 30)
        table.string('bairro', 30)
        table.string('quadra', 30)
        table.string('numero_quadra', 30)
        table.string('conjunto', 30)
        table.string('numero_conjunto', 30)
        table.string('chacara', 30)
        table.string('numero_chacara', 30)
        table.integer('casa')
        table.string('complemento', 255)
        table.string('logradouro', 255)
        table.integer('id_employees').references('idemployees')
            .inTable('atlas.employees').unique()
        table.integer('id_individuals').references('idindividuals')
            .inTable('atlas.individuals').unique()
        table.integer('id_entities').references('identities')
            .inTable('atlas.entities').unique()
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('atlas.address')
}


exports.up = function(knex) {
    return knex.schema.withSchema('atlas').createTable('sale_for_now', table => {
        table.increments('identities').primary()
        table.string('name').notNull()
        table.string('email')
        table.enu('gender', ['m', 'f'])
        table.date('birthday')
        table.string('mother_name')
        table.string('status').defaultTo('Enviado')
        table.string('cnpj').unique()
        table.string('cpf').unique()
        table.integer('ddd')
        table.string('number_res', 10)
        table.string('number_com', 10)
        table.string('number_cel', 10)
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
        table.string('cep')
        table.binary('content').notNull()
        table.string('voz')
        table.string('dados')
        table.string('tecnologia')
        table.string('tv')
        table.string('pontos')
        table.string('pontos_adicionais')
        table.string('tv_lacart')
        table.string('controle')
        table.date('data_vencimento')
        table.string('fatura')
        table.integer('id_vendedor').references('idemployees')
            .inTable('atlas.employees')
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('sale_for_now')
};

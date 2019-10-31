exports.up = function (knex, Promise) {
    return knex.schema.alterTable('atlas.sale_for_now', table => {
        table.string('voz')
        table.string('dados')
        table.string('tecnologia')
        table.string('tv')
        table.string('observacao')
        table.string('pontos')
        table.string('pontos_adicionais')
        table.string('tv_lacart')
        table.string('controle')
        table.date('data_vencimento')
        table.string('fatura')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('atlas.sale_for_now', table => {
        table.dropColumn('voz')
        table.dropColumn('dados')
        table.dropColumn('tecnologia')
        table.dropColumn('tv')
        table.dropColumn('observacao')
        table.dropColumn('pontos')
        table.dropColumn('pontos_adicionais')
        table.dropColumn('tv_lacart')
        table.dropColumn('controle')
        table.dropColumn('data_vencimento')
        table.dropColumn('fatura')
    })
};

exports.up = function (knex, Promise) {
    return knex.schema.alterTable('atlas.sale_for_now', table => {
        table.string('cep')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('atlas.sale_for_now', table => {
        table.dropColumn('cep')
    })
};
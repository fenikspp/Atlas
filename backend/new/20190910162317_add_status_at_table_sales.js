
exports.up = function (knex, Promise) {
    return knex.schema.alterTable('atlas.sales', table => {
        table.string('status').defaultTo('Enviado')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('atlas.sales', table => {
        table.dropColumn('status')
    })
};

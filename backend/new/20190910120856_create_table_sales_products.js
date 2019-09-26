
exports.up = function(knex) {
    return knex.schema.withSchema('atlas').createTable('sales_has_products', table =>{
        table.integer('id_products').references('idproducts')
            .inTable('atlas.products')
        table.integer('id_sales').references('idsales')
            .inTable('atlas.sales')
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('sales_has_products')
}
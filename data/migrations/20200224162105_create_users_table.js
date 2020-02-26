
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {

        table.increments()

        table.string('username', 128)
        .notNullable()
        .unique();

        table.string('password', 128).notNullable();
    })
    .createTable('profile', table => {
        table.increments()

        table.string('name', 128).notNullable()

        table.text('quote').notNullable()

        table.string('favorite_food').notNullable()

        table.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema  
        .dropTableIfExists('profile')
        .dropTableIfExists('users')
};

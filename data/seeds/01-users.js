exports.seed = function(knex) {
  // Inserts seed entries
  return knex('users').insert([
    {username: 'spiderman', password: 'spidey'},
    {username: 'sonic', password: 'hedgehog'},
    {username: 'link', password: 'zelda'},
  ]);
};

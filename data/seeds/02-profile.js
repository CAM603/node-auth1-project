exports.seed = function(knex) {
  // Inserts seed entries
  return knex('profile').insert([
    {name: 'Spider-Man', quote: 'With great power, comes great responsibility.', favorite_food: 'Pizza', user_id: '1' },
    {name: 'Sonic', quote: '"Time for fun, homework is done!"', favorite_food: 'Chili dogs', user_id: '2' },
    {name: 'Link', quote: 'Hyaa! HUT! Seiyah! Haaaaaaaa!', favorite_food: 'Milk', user_id: '3' },
  ]);
};

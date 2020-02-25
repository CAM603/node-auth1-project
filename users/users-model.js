const db = require('../data/dbConfig');

module.exports = {
    get,
    getBy,
    getById,
    add,
    getUserProfile
}

function get(){
    return db('users').select('id', 'username', 'password')
}

function getBy(filter) {
    return db('users')
        .select('id', 'username', 'password')
        .where(filter);
}

function getById(id) {
    return db('users')
        .select('id', 'username')
        .where({id})
        .first()
}

function add(user) {
    return db('users')
        .insert(user, 'id')
        .then(ids => {
            const [id] = ids;
            return getById(id)
        });
}

function getUserProfile(id) {
    return db('profile')
        .join('users', 'profile.user_id', 'users.id')
        .select('users.username', 'profile.name', 'profile.favorite_food as favorite food', 'profile.quote')
        .where({user_id: id})
        .first()
}
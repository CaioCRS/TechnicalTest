var repository = require('../repository/category');

async function GetAll(callback) {
    return await repository.GetAll().then(categories => {
        if (Array.isArray(categories) && categories.length === 0)
            callback(404, 'Categories not found', null);
        else
            callback(200, 'Success', categories);
    })
    .catch(err => {
        callback(500, 'Error', JSON.stringify(err));
    });;
}

module.exports = { GetAll };
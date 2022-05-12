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
    });
}

async function GetById(id, callback) {
    return await repository.GetById(id).then(category => {
        if (!category)
            callback(404, 'Category not found', null);
        else
            callback(200, 'Success', category);
    })
    .catch(err => {
        callback(500, 'Error', JSON.stringify(err));
    });
}

async function Create(category, callback) {
    return await repository.Create(category).then(inserted => {
        if (inserted)
            callback(201, 'Success', null);
        else
            callback(500, 'Error', null);
    })
    .catch(err => {
        callback(500, 'Error', JSON.stringify(err));
    });
}

async function Delete(id, callback) {
    return await repository.Delete(id).then(deleted => {
        if (deleted)
            callback(200, 'Success', null);
        else
            callback(500, 'Error', null);
    })
    .catch(err => {
        callback(500, 'Error', JSON.stringify(err));
    });
}

module.exports = { GetAll, GetById, Create, Delete };
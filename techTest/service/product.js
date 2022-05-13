var repository = require('../repository/product');

async function GetAll(callback) {
    return await repository.GetAll().then(products => {
        if (Array.isArray(products) && products.length === 0)
            callback(404, 'Products not found', null);
        else
            callback(200, 'Success', products);
    })
    .catch(err => {
        callback(500, 'Error', JSON.stringify(err));
    });
}

async function GetById(id, callback) {
    return await repository.GetById(id).then(product => {
        if (!product)
            callback(404, 'Product not found', null);
        else
            callback(200, 'Success', product);
    })
    .catch(err => {
        callback(500, 'Error', JSON.stringify(err));
    });
}

async function Create(product, callback) {
    return await repository.Create(product).then(inserted => {
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

async function Update(id, field, value, callback) {
    return await repository.Update(id, field, value).then(updated => {
        if (updated)
            callback(200, 'Success', null);
        else
            callback(500, 'Error', null);
    })
    .catch(err => {
        callback(500, 'Error', JSON.stringify(err));
    });
}

module.exports = { GetAll, GetById, Create, Delete, Update };
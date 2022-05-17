var repository = require('../repository/category');
var productRepository = require('../repository/product');

function IsValidParameter(object) {
    if (!object.hasOwnProperty('name') ||
        !object.hasOwnProperty('description') ||
        !object.hasOwnProperty('status') ||
        !object.hasOwnProperty('regDate'))
        return false;

    return true;
}

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
    if (id && id > 0 && !isNaN(id)) {
        return await repository.GetById(id).then(category => {
            if (!category)
                callback(404, 'Category not found', null);
            else
                callback(200, 'Success', category);
        })
        .catch(err => {
            callback(500, 'Error', JSON.stringify(err));
        });
    } else {
        callback(403, 'Invalid parameter', null);
    }
}

async function Create(category, callback) {
    if (IsValidParameter(category)){
        return await repository.Create(category).then(inserted => {
            if (inserted)
                callback(201, 'Success', null);
            else
                callback(500, 'Error', null);
        })
        .catch(err => {
            callback(500, 'Error', JSON.stringify(err));
        });
    }else{
        callback(403, 'Invalid parameter', null);
    }
}

async function Delete(id, callback) {
    if (id && id > 0 && !isNaN(id)) {
        let product = await productRepository.GetByField('CategoryId',id);
        
        if (product.length === 0) {
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
        else {
            callback(400, 'Cannot be removed, because exists a product associated', null);
        }
    } else {
        callback(403, 'Invalid parameter', null);
    }
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
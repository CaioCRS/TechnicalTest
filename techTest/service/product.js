var repository = require('../repository/product');
var categoryRepository = require('../repository/category');

function IsValidParameter(object) {
    if (!object.hasOwnProperty('name') ||
        !object.hasOwnProperty('description') ||
        !object.hasOwnProperty('status') ||
        !object.hasOwnProperty('regDate') ||
        !object.hasOwnProperty('value') ||
        !object.hasOwnProperty('CategoryId'))
        return false;

    return true;
}

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
    if (id && id > 0 && !isNaN(id)) {
        return await repository.GetById(id).then(product => {
            if (!product)
                callback(404, 'Product not found', null);
            else
                callback(200, 'Success', product);
        })
            .catch(err => {
                callback(500, 'Error', JSON.stringify(err));
            });
    } else {
        callback(403, 'Invalid parameter', null);
    }
}

async function GetByCategory(id, callback) {
    if (id && id > 0 && !isNaN(id)) {
        return await repository.GetByField('CategoryId', id).then(product => {
            if (!product)
                callback(404, 'Product not found', null);
            else
                callback(200, 'Success', product);
        })
        .catch(err => {
            callback(500, 'Error', JSON.stringify(err));
        });
    } else {
        callback(403, 'Invalid parameter', null);
    }
}


async function Create(product, callback) {
    if (IsValidParameter(product)){
        return await repository.Create(product).then(inserted => {
            if (inserted)
                callback(201, 'Success', null);
            else
                callback(500, 'Error', null);
        })
        .catch(err => {
            callback(500, 'Error', JSON.stringify(err));
        });
    } else {
        callback(403, 'Invalid parameter', null);
    }
}

async function Import(productList, callback) {
    productList.forEach(async function (product) {
        const categoryId = await HandleCategory(product.category);
        const result = await HandleProduct(product, categoryId);
        if (!result)
            callback(403, 'Invalid parameter', null);
    });
    callback(201, 'Success', null);
}

async function Delete(id, callback) {
    if (id && id > 0 && !isNaN(id)) {
        return await repository.Delete(id).then(deleted => {
            if (deleted)
                callback(200, 'Success', null);
            else
                callback(500, 'Error', null);
        })
            .catch(err => {
                callback(500, 'Error', JSON.stringify(err));
            });
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

async function HandleCategory(category) {
    let categoryId = 0;
    if (category && category.name) {
        const existingCategory = await categoryRepository.GetByField('name', category.name);
        if (existingCategory.length === 0) {
            const newCategory = await categoryRepository.Create(category);
            if (newCategory && newCategory.dataValues.id)
                categoryId = newCategory.dataValues.id;
        } else
            categoryId = existingCategory.id;
    }
    return categoryId;
}

async function HandleProduct(product, categoryId) {
    let existingProduct = await repository.GetByField('name', product.name);
    if (existingProduct.length === 0 && categoryId > 0) {
        let newProduct = product;
        delete newProduct.category;
        newProduct.CategoryId = categoryId;
        if (IsValidParameter(newProduct))
            await repository.Create(newProduct);
        else
            return false;
    }
    return true;
}

module.exports = { GetAll, GetById, Create, Delete, Update, GetByCategory, Import };
var db = require('../database/database');

async function GetAll() {
    return new Promise((resolve, reject) => {
        db.Product.findAll()
            .then(products => {
                resolve(products);
            })
            .catch(err => {
                reject(err);
            });
    });
}

async function GetById(id) {
    return new Promise((resolve, reject) => {
        db.Product.findByPk(id)
            .then(product => {
                resolve(product);
            })
            .catch(err => {
                reject(err);
            });
    });
}

async function GetByField(field, value) {
    return new Promise((resolve, reject) => {
        db.Product.findAll({
            where: {
                [field]: value
            }
        })
            .then(product => {
                resolve(product);
            })
            .catch(err => {
                reject(err);
            });
    });
}

async function Create(product) {
    return new Promise((resolve, reject) => {
        db.Product.create({
            name: product.name,
            description: product.description,
            status: product.status,
            regDate: product.regDate,
            value: product.value,
            CategoryId: product.CategoryId
        })
            .then(inserted => {
                resolve(inserted);
            })
            .catch(err => {
                reject(err);
            });
    });
}

async function Delete(id) {
    return new Promise((resolve, reject) => {
        db.Product.destroy({ where: { id } })
            .then(_ => {
                resolve(true);
            })
            .catch(err => {
                reject(err);
            });
    });
}

async function Update(id, field, value) {
    return new Promise((resolve, reject) => {
        GetById(id).then((product) => {
            product.update({ [field]: value })
                .then(_ => {
                    resolve(true);
                })
                .catch(err => {
                    reject(err);
                });
        })
    });
}

module.exports = { GetAll, GetById, GetByField, Create, Delete, Update };
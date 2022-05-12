var db = require('../database/database');

async function GetAll(){
    return new Promise((resolve, reject) => {
        db.Category.findAll()
        .then( categories => {
            resolve(categories);
        })
        .catch( err => {
            reject(err);
        });
    });
}

async function GetById(id){
    return new Promise((resolve, reject) => {
        db.Category.findByPk(id)
        .then( category => {
            resolve(category);
        })
        .catch( err => {
            reject(err);
        });
    });
}

async function Create(category){
    return new Promise((resolve, reject) => {
        db.Category.create({
            name: category.name,
            description: category.description,
            status: category.status,
            regDate: category.regDate
            })
        .then( _ => {
            resolve(true);
        })
        .catch( err => {
            reject(err);
        });
    });
}

async function Delete(id){
    return new Promise((resolve, reject) => {
        db.Category.destroy({ where: { id } })
        .then( _ => {
            resolve(true);
        })
        .catch( err => {
            reject(err);
        });
    });
}

module.exports = { GetAll, GetById, Create, Delete };
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

module.exports = { GetAll };
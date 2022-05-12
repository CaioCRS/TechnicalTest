var express = require('express');
var router = express.Router();
var service = require('../service/category');
var db = require('../database/database');

router.get("/all", function(req, res) {
    try {
        service.GetAll((httpStatusCode, message, response) => {
            return res.status(httpStatusCode).send({
                status: httpStatusCode,
                message,
                response
            });
        })
    } catch (error) {
        return res.status(500).send(JSON.stringify(err));
    }
});

router.get("/:id", function(req, res) {
    db.Category.findByPk(req.params.id)
        .then( category => {
            res.status(200).send(JSON.stringify(category));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.post("/", function(req, res) {
    db.Category.create({
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        regDate: req.body.regDate
        })
        .then( category => {
            res.status(200).send(JSON.stringify(category));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.delete("/:id", function(req, res) {
    db.Category.destroy({
        where: {
            id: req.params.id
        }
        })
        .then( () => {
            res.status(200).send();
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

module.exports = router;
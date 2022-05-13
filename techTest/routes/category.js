var express = require('express');
var router = express.Router();
var service = require('../service/category');
var Auth = require('../middleware/middleware');

router.get("/all", Auth, function(req, res) {
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

router.get("/:id", Auth, function(req, res) {
    try {
        service.GetById(req.params.id, (httpStatusCode, message, response) => {
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

router.post("/", Auth, function(req, res) {
    try {
        service.Create(req.body, (httpStatusCode, message, response) => {
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

router.delete("/:id", Auth, function(req, res) {
    try {
        service.Delete(req.params.id, (httpStatusCode, message, response) => {
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

router.put("/:id/name", Auth, function(req, res) {
    try {
        service.Update(req.params.id, 'name', req.body.value, (httpStatusCode, message, response) => {
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

router.put("/:id/description", Auth, function(req, res) {
    try {
        service.Update(req.params.id, 'description', req.body.value, (httpStatusCode, message, response) => {
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

router.put("/:id/status", Auth, function(req, res) {
    try {
        service.Update(req.params.id, 'status', req.body.value, (httpStatusCode, message, response) => {
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

module.exports = router;
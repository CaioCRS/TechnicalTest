var express = require('express');
var router = express.Router();
var service = require('../service/category');

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

router.post("/", function(req, res) {
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

router.delete("/:id", function(req, res) {
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

router.put("/:id/name", function(req, res) {
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

router.put("/:id/description", function(req, res) {
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

router.put("/:id/status", function(req, res) {
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
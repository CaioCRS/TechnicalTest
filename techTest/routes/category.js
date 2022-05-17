var express = require('express');
var router = express.Router();
var service = require('../service/category');
var Auth = require('../middleware/middleware');

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: category routes
 */

/**
 * @swagger
 * /category/all:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       '200':
 *         description: A list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '404':
 *         description: No one's category found
 */
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

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Get a category by id
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of category
 *         schema:
 *              type: integer
 *         required: true
 *     responses:
 *       '200':
 *         description: A category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '404':
 *          description: Category not found
 */
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

/**
 * @swagger
 * /category:
 *  post:
 *     summary: Create a category
 *     tags: [Category]
 *     requestBody:
 *       description: Creating a new category
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *         text/plain:
 *           schema:
 *             type: string
 *     responses:
 *       '201':
 *         description: Created
 *       '500':
 *         description: Error
 */
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

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Remove a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of category
 *         schema:
 *              type: integer
 *         required: true
 *     responses:
 *       '200':
 *         description: Category removed
 *       '404':
 *          description: Category not found
 */
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

/**
 * @swagger
 * /category/{id}/name:
 *   put:
 *     summary: Edit the category name
 *     tags: [Category]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of category
 *         schema:
 *              type: integer
 *         required: true
 *     requestBody:
 *       description: Value
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Value'
 *         text/plain:
 *           schema:
 *             type: string
 *     responses:
 *       '200':
 *         description: Category updated
 *       '404':
 *          description: Category not found
 */
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

/**
 * @swagger
 * /category/{id}/description:
 *   put:
 *     summary: Edit the category description
 *     tags: [Category]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of category
 *         schema:
 *              type: integer
 *         required: true
 *     requestBody:
 *       description: Value
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Value'
 *         text/plain:
 *           schema:
 *             type: string
 *     responses:
 *       '200':
 *         description: Category updated
 *       '404':
 *          description: Category not found
 */
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

/**
 * @swagger
 * /category/{id}/status:
 *   put:
 *     summary: Edit the category status
 *     tags: [Category]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of category
 *         schema:
 *              type: integer
 *         required: true
 *     requestBody:
 *       description: Value
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ValueBoolean'
 *         text/plain:
 *           schema:
 *             type: boolean
 *     responses:
 *       '200':
 *         description: Category updated
 *       '404':
 *          description: Category not found
 */
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
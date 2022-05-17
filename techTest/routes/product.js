var express = require('express');
var router = express.Router();
var service = require('../service/product');
var Auth = require('../middleware/middleware');

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: product routes
 */

/**
 * @swagger
 * /product/all:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       '200':
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '404':
 *         description: No one's product found
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
 * /product/{id}:
 *   get:
 *     summary: Get a product by id
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of product
 *         schema:
 *              type: integer
 *         required: true
 *     responses:
 *       '200':
 *         description: A product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '404':
 *          description: Product not found
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
 * /product/export:
 *   post:
 *     summary: Get a product by category
 *     tags: [Product]
 *     requestBody:
 *       description: Category Id
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryId'
 *         text/plain:
 *           schema:
 *             type: integer
 *     responses:
 *       '200':
 *         description: A product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '404':
 *          description: Product not found
 */
router.post("/export", Auth, function(req, res) {
    try {
        console.log('TESTEEEEEEEE');
        console.log(req.body);
        service.GetByCategory(req.body.categoryId, (httpStatusCode, message, response) => {
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
 * /product/import:
 *  post:
 *     summary: Import some products and categories
 *     tags: [Product]
 *     requestBody:
 *       description: Product structure
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductImport'
 *         text/plain:
 *           schema:
 *             type: string
 *     responses:
 *       '201':
 *         description: Created
 *       '500':
 *         description: Error
 */
router.post("/import", Auth, function(req, res) {
    try {
        service.Import(req.body, (httpStatusCode, message, response) => {
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
 * /product:
 *  post:
 *     summary: Create a product
 *     tags: [Product]
 *     requestBody:
 *       description: Creating a new product
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
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
 * /product/{id}:
 *   delete:
 *     summary: Remove a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of product
 *         schema:
 *              type: integer
 *         required: true
 *     responses:
 *       '200':
 *         description: Product removed
 *       '404':
 *          description: Product not found
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
 * /product/{id}/name:
 *   put:
 *     summary: Edit the product name
 *     tags: [Product]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of product
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
 *         description: Product updated
 *       '404':
 *          description: Product not found
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
 * /product/{id}/description:
 *   put:
 *     summary: Edit the product description
 *     tags: [Product]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of product
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
 *         description: Product updated
 *       '404':
 *          description: Product not found
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
 * /product/{id}/status:
 *   put:
 *     summary: Edit the product status
 *     tags: [Product]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of product
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
 *         description: Product updated
 *       '404':
 *          description: Product not found
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

/**
 * @swagger
 * /product/{id}/value:
 *   put:
 *     summary: Edit the product value
 *     tags: [Product]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of product
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
 *         description: Product updated
 *       '404':
 *          description: Product not found
 */
router.put("/:id/value", Auth, function(req, res) {
    try {
        service.Update(req.params.id, 'value', req.body.value, (httpStatusCode, message, response) => {
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
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

var indexRouter = require('./routes/index');
var categoryRoute = require('./routes/category');
var productRoute = require('./routes/product');

var app = express();

var swaggerDefinition = {
    openapi: '3.0.1',
    info:
    {
        title: "Swagger",
        version: "1.0.00",
        description: "API documentation"

    },
    components: {
        schemas: require("./schemas.json"),
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
    },
    security: [{
        bearerAuth: []
    }]
}

var options = {
    swaggerDefinition,
    apis: ['./routes/*.js']
}

var swaggerSpec = swaggerJsDoc(options);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/category', categoryRoute);
app.use('/product', productRoute);

module.exports = app;

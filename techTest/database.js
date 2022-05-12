const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_SCHEMA || 'postgres',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'admin',
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        dialectOptions: {
            ssl: process.env.DB_SSL == "true"
        }
    });

const Category = sequelize.define('Category', {
    id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        field: 'id' 
    },
    name: Sequelize.TEXT,
    description: Sequelize.TEXT,
    status: Sequelize.BOOLEAN,
    regDate: Sequelize.DATE
}, {
    // disable the modification of table names; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
  });

const Product = sequelize.define('Product', {
    id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        field: 'id' 
    },
    name: Sequelize.TEXT,
    description: Sequelize.TEXT,
    value: Sequelize.DOUBLE,
    status: Sequelize.BOOLEAN,
    regDate: Sequelize.DATE
}, {
    // disable the modification of table names; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
  });

Category.hasMany(Product);
Product.belongsTo(Category);

module.exports = {
    sequelize: sequelize,
    Category,
    Product
};
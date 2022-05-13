const db = require('./database/database');

const categoryRepository = require('./repository/category');
const productRepository = require('./repository/product');

beforeAll(async () => {
    await db.sequelize.sync({ force: true });
});

test('create category', async () => {
    expect.assertions(1);
    const inserted = await categoryRepository.Create({
        name: 'Eletronics',
        description: 'Only eletronic products here',
        status: true,
        regDate: '2022-05-11'
    })
    expect(inserted).toEqual(true);
});

test('create product', async () => {
    expect.assertions(1);
    const inserted = await productRepository.Create({
        name: 'Product',
        description: 'Great product',
        status: true,
        regDate: '2022-05-12',
        value: 10,
        CategoryId: 1
    })
    expect(inserted).toEqual(true);
});

test('get product', async () => {
    expect.assertions(2);
    const category = await productRepository.GetById(1);
    expect(category.name).toEqual('Product');
    expect(category.status).toEqual(true);
});

test('update product', async () => {
    expect.assertions(1);
    await productRepository.Update(1, 'name', 'Product name updated');
    const category = await productRepository.GetById(1);
    expect(category.name).toEqual('Product name updated');
});

test('delete product', async () => {
    expect.assertions(1);
    await productRepository.Delete(1);
    const category = await productRepository.GetById(1);
    expect(category).toBeNull();
});

test('get category', async () => {
    expect.assertions(2);
    const category = await categoryRepository.GetById(1);
    expect(category.name).toEqual('Eletronics');
    expect(category.status).toEqual(true);
});

test('update category', async () => {
    expect.assertions(1);
    await categoryRepository.Update(1, 'name', 'Name updated');
    const category = await categoryRepository.GetById(1);
    expect(category.name).toEqual('Name updated');
});

test('delete category', async () => {
    expect.assertions(1);
    await categoryRepository.Delete(1);
    const category = await categoryRepository.GetById(1);
    expect(category).toBeNull();
});

afterAll(async () => {
    await db.sequelize.close();
});
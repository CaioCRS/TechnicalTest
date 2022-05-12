const db = require('./database');

beforeAll(async () => {
    await db.sequelize.sync({ force: true });
});

test('create category', async () => {
    expect.assertions(1);
    const category = await db.Category.create({
        name: 'Eletronics',
        description: 'Only eletronic products here',
        status: true,
        regDate: '2022-05-11'
    });
    expect(category.id).toEqual(1);
});

test('get category', async () => {
    expect.assertions(2);
    const category = await db.Category.findByPk(1);
    expect(category.name).toEqual('Eletronics');
    expect(category.status).toEqual(true);
});

test('delete category', async () => {
    expect.assertions(1);
    await db.Category.destroy({
        where: {
            id: 1
        }
    });
    const category = await db.Category.findByPk(1);
    expect(category).toBeNull();
});

afterAll(async () => {
    await db.sequelize.close();
});
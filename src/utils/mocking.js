const { faker } = require('@faker-js/faker');

function generateMockProducts() {
    const products = [];
    for (let i = 0; i < 100; i++) {
        const product = {
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            description: faker.commerce.productDescription(),
            category: faker.commerce.department(),
            image: faker.image.imageUrl(),
            stock: faker.random.number({ min: 0, max: 100 }),
        };
        products.push(product);
    }
    return products;
}

module.exports = { generateMockProducts };
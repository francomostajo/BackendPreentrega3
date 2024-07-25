const express = require('express');
const { generateMockProducts } = require('../utils/mocking.js');
const router = express.Router();

router.get('/mockingproducts', (req, res) => {
    const products = generateMockProducts();
    res.json(products);
});

module.exports = router;
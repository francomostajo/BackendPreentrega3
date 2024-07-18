import express from 'express';
import {
    getProducts,
    getCategories,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/product.controller.js';
import { isAdmin } from '../middleware/auth.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/products', getProducts);
router.get('/categories', getCategories);
router.get('/products/:pid', getProductById);
router.post('/products', isAuthenticated, isAdmin, createProduct);
router.put('/products/:pid', isAuthenticated, isAdmin, updateProduct);
router.delete('/products/:pid', isAuthenticated, isAdmin, deleteProduct);

export default router;
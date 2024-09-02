import express from 'express';
import {
    registerUser,
    loginUser,
    getCurrentUser,
    requestPasswordResetController,
    resetPassword
} from '../controllers/auth.controller.js';
import { getCarts, createNewCart, addProduct, purchaseCart } from '../controllers/cart.controller.js';
import { createProduct, updateProduct, deleteProduct, getProductById, getProducts } from '../controllers/product.controller.js';

const router = express.Router();

// Rutas de prueba para usuarios
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/current', getCurrentUser);
router.post('/request-password-reset', requestPasswordResetController);
router.post('/reset-password/:token', resetPassword);

// Rutas de prueba para carritos
router.get('/carts', getCarts);
router.post('/carts', createNewCart);
router.post('/carts/:cid/product/:pid', addProduct);
router.post('/carts/:cid/purchase', purchaseCart);

// Rutas de prueba para productos
router.get('/products', getProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.get('/products/:id', getProductById);

export default router;
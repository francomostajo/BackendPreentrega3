import { getAllCarts, createCart, addProductToCart, addProductToUserCart, purchaseCart as purchaseCartService } from '../service/cart.service.js';
import User from '../dao/models/user.model.js';

export const getCarts = async (req, res) => {
    try {
        const carts = await getAllCarts();
        res.json(carts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createNewCart = async (req, res) => {
    try {
        const cart = await createCart(req.body.products);
        res.status(201).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const addProduct = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await addProductToCart(cid, pid);
        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const addProductToUser = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id;
        const cart = await addProductToUserCart(userId, productId, quantity);
        res.json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const purchaseCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const userId = req.user._id;
        const ticket = await purchaseCartService(cid, userId);
        res.status(200).json({ success: true, ticket });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const viewCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const userId = req.user._id;
        const user = await User.findById(userId).populate({
            path: 'cart',
            populate: {
                path: 'products.productId'
            }
        });

        if (!user || !user.cart || !user.cart._id.equals(cid)) {
            return res.status(404).render('cart', { error: 'Carrito no encontrado' });
        }

        const cart = user.cart;
        const totalAmount = cart.products.reduce((acc, item) => acc + (item.productId.price * item.quantity), 0);

        res.render('cart', { cart, totalAmount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
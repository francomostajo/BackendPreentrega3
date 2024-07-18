import { register } from '../service/auth.service.js';
import UserDTO from '../dto/user.dto.js';
import passport from 'passport';

export const registerUser = async (req, res) => {
    try {
        const user = await register(req.body);
        res.redirect('/login');
    } catch (error) {
        res.status(500).send('Error al registrar usuario');
    }
};

export const loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('error', 'Usuario no registrado. Por favor, regístrese.');
            return res.render('login', { message: req.flash('error') });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/products');
        });
    })(req, res, next);
};

export const logoutUser = (req, res) => {
    req.logout();
    res.redirect('/login');
};

export const githubCallback = async (req, res) => {
    req.session.user = req.user;
    res.redirect('/products');
};

export const getCurrentUser = (req, res) => {
    try {
        console.log("Current User:", req.user);  // Debugging information
        const user = req.user; // Assuming req.user contains the user data
        const userDTO = new UserDTO(user);
        res.json(userDTO);
    } catch (error) {
        console.error("Error fetching current user data:", error);  // More detailed error log
        res.status(500).json({ message: 'Error fetching current user data' });
    }
};
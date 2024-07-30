import { register } from '../service/auth.service.js';
import UserDTO from '../dto/user.dto.js';
import passport from 'passport';
import createError from 'http-errors';

export const registerUser = async (req, res, next) => {
    try {
        const user = await register(req.body);
        res.redirect('/login');
    } catch (error) {
        console.error('Error al registrar usuario:', error.message); // Log detallado del error
        next(createError(500, 'USER_REGISTER_ERROR'));
    }
};

export const loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Error during login authentication:', err);
            return next(createError(500, 'USER_LOGIN_ERROR'));
        }
        if (!user) {
            console.log('User not found:', info);
            req.flash('error', 'Usuario no registrado. Por favor, regístrese.');
            return res.render('login', { message: req.flash('error') });
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error('Error during user login:', err);
                return next(createError(500, 'USER_LOGIN_ERROR'));
            }
            return res.redirect('/products');
        });
    })(req, res, next);
};

export const logoutUser = (req, res, next) => {
    try {
        req.logout();
        res.redirect('/login');
    } catch (error) {
        next(createError(500, 'USER_LOGOUT_ERROR'));
    }
};

export const githubCallback = async (req, res) => {
    req.session.user = req.user;
    res.redirect('/products');
};

export const getCurrentUser = (req, res, next) => {
    try {
        console.log("Current User:", req.user);  // Debugging information
        const user = req.user; // Assuming req.user contains the user data
        const userDTO = new UserDTO(user);
        res.json(userDTO);
    } catch (error) {
        console.error("Error fetching current user data:", error);  // More detailed error log
        next(createError(500, 'USER_FETCH_ERROR'));
    }
};
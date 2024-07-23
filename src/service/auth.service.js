import bcrypt from 'bcrypt';
import {
    findUserByEmail,
    createUser
} from '../dao/data/userDao.js';
import UserModel from '../dao/models/user.model.js';

export const register = async (userData) => {
    const { first_name, last_name, email, age, password } = userData;

    // Verificar si el usuario ya existe
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw new Error('El usuario ya existe');
    }

    // Crear el nuevo usuario
    const user = new UserModel({ first_name, last_name, email, age, password });

    // Asignar rol basado en el correo y la contraseña
    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        user.role = 'admin';
    } else {
        user.role = 'user';
    }

    // Guardar el nuevo usuario en la base de datos
    await createUser(user);
    return user;
};

export const authenticateUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Contraseña incorrecta');
    }
    return user;
};
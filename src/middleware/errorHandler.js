import errorDictionary from '../utils/errorDictionary.js';

function errorHandler(err, req, res, next) {
    if (err) {
        console.error('Error: ', err.message); // Log detallado del mensaje del error
        console.error('Stack trace: ', err.stack); // Log de la traza del error

        const errorResponse = errorDictionary[err.message] || {
            code: 9999,
            message: 'Unknown error',
        };

        res.status(500).json({ error: errorResponse });
    } else {
        next();
    }
}

export default errorHandler;
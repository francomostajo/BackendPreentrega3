/* import { expect } from 'chai'; // Importación única de expect
import request from 'supertest'; // Importación única de request
import app from '../src/app.js';

describe('Testing Sessions Endpoints', function () {
    this.timeout(5000);

    it('Debe registrar un nuevo usuario', async () => {
        const userData = {
            firstName: 'Prueba',
            lastName: 'Usuario',
            email: 'prueba@example.com',
            password: '123456'
        };

        const response = await request(app).post('/api/register').send(userData);
        
        expect(response.status).to.equal(201);
        expect(response.body.status).to.equal('success');
    });

    it('Debe iniciar sesión', async () => {
        const loginData = {
            email: 'prueba@example.com',
            password: '123456'
        };

        const response = await request(app).post('/api/login').send(loginData);
        
        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal('success');
    });

    it('Debe obtener el usuario actual', async () => {
        const response = await request(app).get('/api/current');
        
        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal('success');
        expect(response.body.payload).to.have.property('email');
    });
}); */
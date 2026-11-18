
const request = require('supertest');
const app = require('../server');

describe('REST API Testing', () => {

    test('GET / should return welcome message', async () => {
        const response = await request(app).get('/');

        expect(response.statusCode).toBe(200);
        expect(response.body.message)
            .toBe('Welcome to REST API Application');
    });

    test('GET /students should return students', async () => {
        const response = await request(app).get('/students');

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(2);
    });

});

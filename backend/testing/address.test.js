const request = require('supertest');
const app = require('../index.js'); 


describe('Admin Route Tests', function() {
    let token;

    // Log in before running the user route tests
    before(async function() {
        const loginResponse = await request(app.callback())
            .post('/user/login') 
            .send({ username: 'adminadmin', password: 'adminadmin' }) 
            .expect(200);

        token = loginResponse.body.user.token; // Save the token for later use
        console.log("Token: ", token); // Log the token for inspection
    });

    // 1. GET  user adress by id - Get an address by AddressID (Protected)

    it('GET /address/:id - Admin can access any address by ID', async () => {
        await request(app.callback())
            .get('/address/5') // Replace with a valid address ID
            .set('Cookie', [`token=${token}`])
            .expect(200);
    });

    // 2. GET /address/ - Get all addresses for a specific user (Protected)
    it('GET /address/ - Admin can access all addresses for a specific user', async () => {
        await request(app.callback())
            .get('/address/')
            .set('Cookie', [`token=${token}`])
            .expect(200);
    });

    // 3. PUT /address/:id - Update an address by AddressID (Protected)

    it('PUT /address/:id - Admin can update any address by ID', async () => {
        await request(app.callback())
            .put('/address/5') 
            .set('Cookie', [`token=${token}`])
            .send({
                // Updated address details
                AddressLine1: '321 New St',
                City: 'Newtown',
                State: 'NewState',
                PostalCode: '54321',
                Country: 'NewCountry'
            })
            .expect(200);
    });
    
/*
    it('DELETE /address/:id - Admin can delete any address by ID', async () => {
        await request(app.callback())
            .delete('/address/23') // Replace with a valid address ID
            .set('Cookie', [`token=${token}`])
            .expect(200);
    });
    
*/    
    
});


describe('User Route Tests', function() {
    let token;

    // Log in before running the user route tests
    before(async function() {
        const loginResponse = await request(app.callback())
            .post('/user/login') // Adjust if your login route differs
            .send({ username: 'guigui', password: 'guigui' }) 
            .expect(200);

        token = loginResponse.body.user.token; // Save the token for later use
        console.log("Token: ", token); // Log the token for inspection
    });

    // 1. POST /address - Create a new address for a user

    it('POST /address - Admin can create an address', async () => {
        await request(app.callback())
            .post('/address')
            .set('Cookie', [`token=${token}`]) 
            .send({
                // Add address details here
                AddressLine1: '123 Main St',
                City: 'Townsville',
                State: 'State',
                PostalCode: '12345',
                Country: 'Country'
            })
            .expect(201);
    });

    // 2. GET /address/:id - Get an address by AddressID (Protected)

    it('GET /address/ - Admin can access all addresses for a specific user', async () => {
        await request(app.callback())
            .get('/address/')
            .set('Cookie', [`token=${token}`])
            .expect(200);
    });

    it('DELETE /address/:id - Admin can delete any address by ID', async () => {
        await request(app.callback())
            .delete('/address/5') // Replace with a valid address ID
            .set('Cookie', [`token=${token}`])
            .expect(403);
    });
});

    

    
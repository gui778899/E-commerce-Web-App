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

    // Admin: Get a payment by ID
it('Admin can get a payment by ID', async () => {
    await request(app.callback())
        .get('/payment/15') // Replace with actual payment ID
        .set('Cookie', [`token=${token}`])
        .expect(200);
});

// Admin: Get all payments
it('Admin can get all payments', async () => {
    await request(app.callback())
        .get('/payment')
        .set('Cookie', [`token=${token}`])
        .expect(200);
});


});

describe('User Route Tests', function() {
    let token;

    // Log in before running the user route tests
    before(async function() {
        const loginResponse = await request(app.callback())
            .post('/user/login') 
            .send({ username: 'guigui', password: 'guigui' }) 
            .expect(200);

        token = loginResponse.body.user.token; // Save the token for later use
        console.log("Token: ", token); // Log the token for inspection
    });

    // User: Get their own payment by ID
it('User can get their own payment by ID', async () => {
    await request(app.callback())
        .get('/payment/15') // Replace with actual payment ID
        .set('Cookie', [`token=${token}`])
        .expect(200);
});

});   
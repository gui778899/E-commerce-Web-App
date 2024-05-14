const request = require('supertest');
const app = require('../index.js');


describe('Admin Route Tests', function() {
    let token;

    // Log in before running the user route tests
    before(async function() {
        const loginResponse = await request(app.callback())
            .post('/user/login') 
            .send({ username: 'adminadmin', password: 'adminadmin' }) // Use your admin credentials
            .expect(200);

        token = loginResponse.body.user.token; // Save the token for later use
        console.log("Token: ", token); // Log the token for inspection
    });

    // Admin
it('Admin can get all carts', async () => {
    await request(app.callback())
        .get('/cart')
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

    // User (Should fail)
it('User cannot get all carts', async () => {
    await request(app.callback())
        .get('/cart')
        .set('Cookie', [`token=${token}`])
        .expect(403);
})





it('User can create their own cart', async () => {
    await request(app.callback())
        .post('/cart/user')
        .set('Cookie', [`token=${token}`])
        .expect(201);
});

// User
it('User can get their own cart', async () => {
    const response = await request(app.callback())
        .get('/cart/user')
        .set('Cookie', [`token=${token}`]);

    // Check if the status is either 200 or 404
    if (response.status !== 200 && response.status !== 404) {
        throw new Error(`Expected status 200 or 404, but got ${response.status}`);
    }
});

// User
it('User can delete their own cart', async () => {
    await request(app.callback())
        .delete('/cart')
        .set('Cookie', [`token=${token}`])
        .expect(200);
});

});
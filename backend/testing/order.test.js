const request = require('supertest');
const app = require('../index.js');




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



//// create a cart for the user to test the next routes 
it('User can create their own cart', async () => {
    await request(app.callback())
        .post('/cart/user')
        .set('Cookie', [`token=${token}`])
        .expect(201);
}); 

// User: Add an item to their cart for the next routes 
it('User can add an item to their cart', async () => {
    await request(app.callback())
        .post('/cart-items')
        .set('Cookie', [`token=${token}`])
        .send({ productId: '10' }) // Replace with a valid productId
        .expect(201);
});

// User: Create a new order
it('User can create a new order', async () => {
    await request(app.callback())
        .post('/order/')
        .set('Cookie', [`token=${token}`])
        .expect(201);
});

// User: Get their own order by ID
it('User can get their own order by ID', async () => {
    await request(app.callback())
        .get('/order/orderinfo')
        .set('Cookie', [`token=${token}`])
        .expect(200);
});


// User: Delete their own order
it('User can delete their own order', async () => {
    await request(app.callback())
        .delete('/order')
        .set('Cookie', [`token=${token}`])
        .expect(200);
});


// Delete cart for complete testing purposes 
it('User can delete their own cart', async () => {
    await request(app.callback())
        .delete('/cart')
        .set('Cookie', [`token=${token}`])
        .expect(200);
});



});
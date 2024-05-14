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

    // Admin: Get all items in a cart
it('Admin can get all items in a cart', async () => {
    await request(app.callback())
        .get('/cart-items')
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

    // User: Get all items in their own cart
it('User can get all items in their own cart', async () => {
    const response= await request(app.callback())
        .get('/cart-items')
        .set('Cookie', [`token=${token}`])
        // Check if the status is either 200 or 404 ( if user has a cart or cart is empty)
    if (response.status !== 200 && response.status !== 404) {
        throw new Error(`Expected status 200 or 404, but got ${response.status}`);
    }
});

//// create a cart for the user to test the next routes 
it('User can create their own cart', async () => {
    await request(app.callback())
        .post('/cart/user')
        .set('Cookie', [`token=${token}`])
        .expect(201);
}); 
// User: Add an item to their cart
it('User can add an item to their cart', async () => {
    await request(app.callback())
        .post('/cart-items')
        .set('Cookie', [`token=${token}`])
        .send({ productId: '10' }) // Replace with a valid productId
        .expect(201);
});
// User: Update a cart item's quantity in their cart
it('User can update a cart item in their cart', async () => {
    await request(app.callback())
        .put('/cart-items/150') // Replace with a valid item ID
        .set('Cookie', [`token=${token}`])
        .send({ quantity: 5 }) // Example update data
        .expect(201);
});

// User: Remove an item from their cart
it('User can remove an item from their cart', async () => {
    await request(app.callback())
        .delete('/cart-items/10') // Replace with a valid item ID
        .set('Cookie', [`token=${token}`])
        .expect(200);
});

/// delete the cart to maitain the state of the database

it('User can delete their own cart', async () => {
    await request(app.callback())
        .delete('/cart')
        .set('Cookie', [`token=${token}`])
        .expect(200);
});

});
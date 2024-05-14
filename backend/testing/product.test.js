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
    
    // get all products
    it('Admin can get all products', async () => {
        await request(app.callback())
            .get('/product')
            .set('Cookie', [`token=${token}`])
            .expect(200);
    });

    // get product by id
    it('Admin can get a product by ID', async () => {
        await request(app.callback())
            .get('/product/7') 
            .set('Cookie', [`token=${token}`])
            .expect(200);
    });

    // Admin
    it('Admin can add a new product', async () => {
        await request(app.callback())
            .post('/product')
            .set('Cookie', [`token=${token}`])
            .send({
                Name: 'New Product',
                Description: 'Product Description',
                Price: 99.99,
                StockQuantity: 100
            })
            .expect(201);
    });

    // Admin
    it('Admin can update a product', async () => {
        await request(app.callback())
            .put('/product/10') 
            .set('Cookie', [`token=${token}`])
            .send({
                Name: 'Updated Product Name',
                Description: 'Updated Description',
                Price: 109.99,
                StockQuantity: 150
            })
            .expect(200);
    });
/*
    // Admin
    it('Admin can delete a product', async () => {
        await request(app.callback())
            .delete('/product/34') 
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

    // User get all products 
    it('User can get all products', async () => {
        await request(app.callback())
            .get('/product')
            .set('Cookie', [`token=${token}`])
            .expect(200);
    });

    // User get a product by id
    it('User can get a product by ID', async () => {
        await request(app.callback())
            .get('/product/7') 
            .set('Cookie', [`token=${token}`])
            .expect(200);
    });


    // User (Should fail)
    it('User cannot add a new product', async () => {
        await request(app.callback())
            .post('/product')
            .set('Cookie', [`token=${token}`])
            .send({
                Name: 'New Product',
                Description: 'Product Description',
                Price: 99.99,
                StockQuantity: 100
            })
            .expect(403);
    });


    // User (Should fail)
    it('User cannot update a product', async () => {
        await request(app.callback())
            .put('/product/10') 
            .set('Cookie', [`token=${token}`])
            .send({
                Name: 'Updated Product Name',
                Description: 'Updated Description',
                Price: 109.99,
                StockQuantity: 150
            })
            .expect(403);
    });

    // User (Should fail)
    it('User cannot delete a product', async () => {
        await request(app.callback())
            .delete('/product/10')
            .set('Cookie', [`token=${token}`])
            .expect(403);
    });

    
});

    

    
// user.test.js
const request = require('supertest');
const app = require('../index.js'); 



describe('Admin Login Test', function() {
    it('should log in as an admin', async function() {
        const response = await request(app.callback())
            .post('/user/login') // login endpoint
            .send({
                username: 'adminadmin', // Replace with a valid admin username
                password: 'adminadmin'  // Replace with a valid admin password
            })
            .expect(200); // Status code for successful login

        console.log("Login Response: ", response.body); // Logging the response for inspection
    });
});

describe('Admin Route Tests', function() {
    let token;

    // Log in before running the user route tests
    before(async function() {
        const loginResponse = await request(app.callback())
            .post('/user/login') 
            .send({ username: 'adminadmin', password: 'adminadmin' }) // Admin credentials
            .expect(200);

        token = loginResponse.body.user.token; // Save the token for later use
        console.log("Token: ", token); // Log the token for inspection
    });

    describe('GET /user', function() {
        it('responds with JSON and status 200 for authorized admin user', async () => {
            await request(app.callback())
                .get('/user') 
                .set('Cookie', [`token=${token}`]) // Set the token as a cookie
                .expect(200);
        });
    });
    // 4. GET /user/profile - Get a single user by its id
    it('GET /user/profile - Regular user can access their own data', async () => {
        await request(app.callback())
            .get('/user/profile')
            .set('Cookie', [`token=${token}`])
            .expect(200);
    });
/*
     // 6. DELETE /user/:id - Delete a user by its id
    it('DELETE /user/ - Admin can delete a user', async () => {
        await request(app.callback())
            .delete('/user/13') 
            .set('Cookie', [`token=${token}`])
            .expect(200);
    });
*/

// 7. GET /user/auth-check - Authenticated user is recognized
it('GET /user/auth-check - Authenticated user is recognized', async () => {
    await request(app.callback())
        .get('/user/auth-check')
        .set('Cookie', [`token=${token}`])
        .expect('Content-Type', /json/)
        .expect(200, {
            isAuthenticated: true,
            role: 'admin' 
        });
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

    describe('GET /user', function() {
        it('responds with JSON and status 403 for unauthorized user', async () => {
          await request(app.callback())
            .get('/user')
            .set('Cookie', [`token=${token}`])
            .expect('Content-Type', /text/)
            .expect(403);
        });
    });
    // 4. GET /user/profile - Get a single user by its id
    it('GET /user/profile - Regular user can access their own data', async () => {
        await request(app.callback())
            .get('/user/profile')
            .set('Cookie', [`token=${token}`])
            .expect(200);
    });

    // 5. PUT /user/:id - Update a user by its id
    it('PUT /user/:id - Regular user can update their own data', async () => {
        await request(app.callback())
            .put('/user/46') 
            .set('Cookie', [`token=${token}`])
            .send({ firstName: 'UpdatedName' })
            .expect(200);
    });

    // 5. PUT /user/:id - Update a user by a different id 
    it('PUT /user/:id - Regular user can update their own data', async () => {
        await request(app.callback())
            .put('/user/47') // replace with an user to update
            .set('Cookie', [`token=${token}`])
            .send({ firstName: 'UpdatedName' })
            .expect(403);
    });
    // 6. DELETE /user/:id - Delete a user by a different user 
    it('DELETE /user/ - Admin can delete a user', async () => {
        await request(app.callback())
            .delete('/user/13') // replace with an user to delete 
            .set('Cookie', [`token=${token}`])
            .expect(403);
    });


    // 7. GET /user/auth-check - Authenticated user is recognized
    it('GET /user/auth-check - Authenticated user is recognized', async () => {
        await request(app.callback())
            .get('/user/auth-check')
            .set('Cookie', [`token=${token}`])
            .expect('Content-Type', /json/)
            .expect(200, {
                isAuthenticated: true,
                role: 'user' // Replace with actual expected role
            });
    });
});
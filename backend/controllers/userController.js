const db = require('../database/database')
const model = require('../models/user');
const etag = require('etag');
const can = require('../permissions/users');
const prefix = '/api/v1/users';
const { generateToken } = require('../auth_validation/jwt');
const { verifyPassword } = require('../strategies/bcrypt');
const jwt = require('jsonwebtoken');

class userController {
    static async logout(ctx) {
        ctx.cookies.set('token', null);
        ctx.status = 200;
        ctx.body = { message: 'Logged out successfully' };
      }

static async checkAuth(ctx) {
    try {
      const token = ctx.cookies.get('token');
      if (!token) {
        ctx.status = 200;
        ctx.body = { isAuthenticated: false };
        return;
      }

      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // If verification is successful, include the user role in the response
      ctx.status = 200;
      ctx.body = { 
        isAuthenticated: true, 
        role: decoded.role // Assuming the role is included in the JWT token
      };
    } catch (error) {
      // If there's an error (like token expiration), consider the user unauthenticated
      ctx.status = 200;
      ctx.body = { isAuthenticated: false };
    }
}
    static async  emailSearch(ctx, next) {
        // TODO: this implementation is basic
        // you could add pagination, partial response, etc.
    
        const permission = can.readAll(ctx.state.user);
        if (!permission.granted) {
        ctx.status = 403;
        } else {
        let {q} = ctx.request.query;
        
        if (q && q.length < 3) {
            ctx.status = 400;
            ctx.body = {message: "Search string length must be 3 or more."}
            return next();
        }
    
        let result = await model.emailSearch(q);
        if (result.length) {
            const user = {
                UserID: result[0][0].UserID,
                username: result[0][0].username,
                email: result[0].email,
                role: result[0][0].role,
                firstName: result[0][0].firstName,
                lastName: result[0][0].lastName,
                about: result[0][0].about,
                dateRegistered: result[0][0].dateRegistered,
                avatarURL: result[0][0].avatarURL,
                modified: result[0][0].modified,
                AddressLine1: result[0][0].AddressLine1,
                City: result[0][0].City,
                State: result[0][0].State,
                PostalCode: result[0][0].PostalCode,
                Country: result[0][0].Country
            };
    
            ctx.body = user;
        }    
        }
    }
    
    static async login(ctx) {
        try {
            const { username, password } = ctx.request.body;
            const user = await model.findByUsername(username); // Adjust this to match your database query
    
            if (user && await verifyPassword(user, password)) {
                const token = generateToken({ id: user.UserID, username: user.username, role: user.role });
    
                // Set the token in an httpOnly cookie
                ctx.cookies.set('token', token, {
                    httpOnly: true, // The cookie is not accessible via JavaScript
                    secure: process.env.NODE_ENV === 'production', // Use secure in production (requires https)
                    maxAge: 1000 * 60 * 60 * 24 * 7 // cookie expiry set to 7 days
                });
    
                // Respond with user info (but not the token since it's in the cookie)
                ctx.status = 200;
                ctx.body = {
                    message: 'Login successful',
                    user: {
                        token: token,
                        ID: user.id,
                        username: user.username,
                        email: user.email,
                        avatarURL: user.avatarURL
                    }
                };
            } else {
                ctx.status = 401;
                ctx.body = { message: 'Incorrect username or password' };
            }
        } catch (error) {
            ctx.status = 500;
            ctx.body = { message: 'Internal server error', error: error.message };
        }
    }
    
    
    
    static async  getAll(ctx) {
        const permission = can.readAll(ctx.state.user);
        if (!permission.granted) {
        ctx.status = 403;
        } else {
        console.log(ctx.request.query);
    
        let {limit=10, page=1, fields=null} = ctx.request.query;
    
        // ensure params are integers
        limit = parseInt(limit);
        page = parseInt(page);
          
        // validate pagination values to ensure they are sensible
        limit = limit > 100 ? 100 : limit;
        limit = limit < 1 ? 10 : limit;
        page = page < 1 ? 1 : page;    
    
        let result = await model.getAll(limit, page);
        if (result.length) {
            if (fields !== null) {
            // first ensure the fields are contained in an array
            // need this since a single field is passed as a string
            if (!Array.isArray(fields)) {
                fields = [fields];
            }
            // then filter each row in the array of results
            // by only including the specified fields
            result = result.map(record => {
                let partial = {};
                for (let field of fields) {
                    partial[field] = record[field];
                }
                return partial;
            });      
            }
            ctx.body = result;
        }    
        }
    }
    
    static async  getById(ctx, next) {
        const requester = ctx.state.user;
        const result = await model.getById(ctx.state.user.id);
        if (result.length) {
        const [data]= result[0]
        const permission = can.read(requester, data);
        if (!permission.granted) {
            ctx.status = 403;
        } else {
            console.log(ctx.headers);
    
            const body = permission.filter(data);
            const Etag = etag(JSON.stringify(body));
            const modified = new Date(data.modified);
    
            let is304 = false;
    
            const {['if-none-match']:if_none_match} = ctx.headers;
            if (if_none_match === Etag) is304 = true;
            
            const {['if-modified-since']:if_modified_since} = ctx.headers;
            if (modified < Date.parse(if_modified_since)) is304 = true;
    
            if (is304) {
            ctx.status = 304;
            return next();
            }
    
            ctx.body = body;
            ctx.set('Last-Modified', modified.toUTCString());
            ctx.set('Etag', Etag);
        }
        }
    }
    
    static async createUser(ctx) {
        const body = ctx.request.body;
    
        try {
            console.log('Received request to create user:', body);
            const [result] = await model.add(body);
            console.log('Result of adding user:', result);
            if (result.affectedRows) {
                const id = result.insertId;
                ctx.status = 201;
                ctx.body = {
                    ID: id,
                    created: true,
                    message: "User created successfully"
                };
                console.log('User created with ID:', ctx.body.ID);
            }
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                // Handle duplicate entry error
                ctx.status = 409; // 409 Conflict
                ctx.body = { error: 'Username already exists' };
            } else {
                // Handle other errors
                console.error('Error in createUser:', error);
                ctx.status = 500;
                ctx.body = { error: 'Internal server error' };
            }
        }
    }
    
    
    static async  updateUser(ctx) {
        const id = ctx.params.id;
        let [result] = await model.getById(id);
        console.log(result);// check it exists
        if (result.length) {
        let data = result[0];
        const permission = can.update(ctx.state.user, data);
        if (!permission.granted) {
            ctx.status = 403;
        } else {
            console.log("User is allowed to update");
            // exclude fields that should not be updated 
            const newData = permission.filter(ctx.request.body);
            console.log("New data is", newData);
            Object.assign(newData, {UserID: id}); // overwrite updatable fields with body data
            console.log("New data is", newData);
            result = await model.update(newData);
            if (result[0].affectedRows) {
            ctx.body = {UserID: id, updated: true, link: ctx.request.path};
            }
        }
        }
    }
    
    static async  deleteUser(ctx) {
        const id = ctx.params.id;
        let result = await model.getById(id);
        if (result.length) {
        const data = result[0];
        console.log("trying to delete", data);
        console.log("user is", ctx.state.user)
        const permission = can.delete(ctx.state.user, data);
        if (!permission.granted) {
            ctx.status = 403;
        } else {
            result = await model.delById(id);
            
            console.log('Result of deleting user:', result);
            if (result[0].affectedRows) {
            ctx.body = {UserID: id, deleted: true}
            }      
        }
        }
    }
}



module.exports = userController;
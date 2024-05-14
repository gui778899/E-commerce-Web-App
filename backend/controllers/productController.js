const db = require('../database/database');
const model = require('../models/product');
const permissions = require('../permissions/product');
class ProductController {
    static async all(ctx) {

        try {
            const permission = permissions.readProduct(ctx.state.user);
            if (!permission.granted) {
                ctx.status = 403;
                ctx.body = { message: "You do not have permission to read a product." };
            return;
            }
            
            
        const rows=await model.allproducts(ctx);// Destructure to get the first element (rows)
        console.log({ data: rows});
        ctx.body = { data: rows}; // Use only rows here
        ctx.status = 200;
        } catch (error) {
            console.log('Error in Product Controller:', error);
            ctx.status = 500;
            ctx.body = { error: 'Internal server error' };
        }
    }


    static async byId(ctx) {
        try {
            const permission = permissions.readProduct(ctx.state.user);
            if (!permission.granted) {
                ctx.status = 403;
                ctx.body = { message: "You do not have permission to read a product." };
            return;
            }
            const rows = await model.byId(ctx) // Destructure to get rows
        ctx.body = rows.length ? 
            ctx.body= { data: rows[0], message: 'Product retrieved successfully' } :
            { message: 'Product not found' };
        ctx.status = rows.length ? 200 : 404;
        } catch (error) {
            console.log('Error in Product Controller:', error);
            ctx.status = 500;
            ctx.body = { error: 'Internal server error' };
        }
    }

    static async delete(ctx) {
        try {
            const permission = permissions.deleteProduct(ctx.state.user);
            if (!permission.granted) {
                ctx.status = 403;
                ctx.body = { message: "You do not have permission to delete a product." };
            return;
        }
        const productId = ctx.params.id;
        const result = await model.delete(ctx); // We can destructure to check the result if needed
        if (result.affectedRows) {
            ctx.body = { message: `Product with ProductID ${productId} deleted successfully` };
            ctx.status = 200;
            } else {
                ctx.body = { message: 'Product not found' };
                ctx.status = 404;
            }
        } catch (error) {
            console.log('Error in Product Controller:', error);
            ctx.status = 500;
            ctx.body = { error: 'Internal server error' };
        }
    }

    static async add(ctx) {
        try {
            const permission = permissions.createProduct(ctx.state.user);
            if (!permission.granted) {
                ctx.status = 403;
                ctx.body = { message: "You do not have permission to create a product." };
            return;
        }
            
            const { Name, Description, Price, StockQuantity } = ctx.request.body;
            const result = await model.add(ctx); // Destructure to get the first element (result)
            ctx.body = { message: 'Product added successfully', productId: result.insertId };
            ctx.status = 201;
        } catch (error) {
            console.log('Error in Product Controller:', error);
            ctx.status = 500;
            ctx.body = { error: 'Internal server error' };
        }
    }

    static async update(ctx) {
        try {
            const permission = permissions.updateProduct(ctx.state.user);
            if (!permission.granted) {
                ctx.status = 403;
                ctx.body = { message: "You do not have permission to update a product." };
            return;
        }
            const { id } = ctx.params;
            const { Name, Description, Price, StockQuantity } = ctx.request.body;
    
            // Check if request body contains the necessary properties
            if (!Name && !Description && !Price && !StockQuantity) {
                ctx.status = 400;
                ctx.body = { error: 'No fields provided for update' };
                return;
            }
    
            let query = 'UPDATE Product SET';
            const updates = [];
            const params = [];
    
            if (Name) {
                updates.push('Name = ?');
                params.push(Name);
            }
            if (Description) {
                updates.push('Description = ?');
                params.push(Description);
            }
            if (Price) {
                updates.push('Price = ?');
                params.push(Price);
            }
            if (StockQuantity) {
                updates.push('StockQuantity = ?');
                params.push(StockQuantity);
            }
    
            query += ' ' + updates.join(', ') + ' WHERE ProductID = ?';
            params.push(id);
    
            const [result] = await db.query(query, params);
    
            if (result.affectedRows) {
                ctx.body = { message: 'Product updated successfully' };
                ctx.status = 200;
            } else {
                ctx.body = { message: 'Product not found' };
                ctx.status = 404;
            }
        } catch (error) {
            console.log('Error in Product Controller:', error);
            ctx.status = 500;
            ctx.body = { error: 'Internal server error' };
        }
    }
    

}

module.exports = ProductController;

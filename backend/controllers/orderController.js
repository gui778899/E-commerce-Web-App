const db = require('../database/database'); 
const model = require('../models/order');
const permissions = require('../permissions/order'); 

class OrderController {
    static async createOrder(ctx) {
        const {...orderData } = ctx.request.body;
        console.log('orderData:', orderData);
    
        // Get the authenticated user's ID from ctx.state.user
        const authUserId = ctx.state.user.id;
        
        // Check if the authenticated user has permission to create an order
        const permission = await permissions.createOrder(ctx.state.user);
        console.log('permission:', permission);
        if (!permission.granted) {
            ctx.status = 403;
            ctx.body = { message: "You do not have permission to create an order." };
            return;
        }
        
        try {
            const insertId = await model.create(ctx.state.user.id, orderData);
            console.log('insertId:', insertId);
            
            ctx.status = 201; // Created
            ctx.body = { orderId: insertId }; // Send back the new order ID in the response
            console.log('complete');
        } catch (error) {
            ctx.status = 400; // Bad Request
            ctx.body = { error: error.message };     
        }
    }

    static async getAllOrders(ctx) {
        const permission = await permissions.getAllOrders(ctx.state.user);
        if (!permission.granted) {
        ctx.status = 403;
        ctx.body = { message: "You do not have permission to get order." };
        return;
        }
        try {
            // Retrieve all orders from the database using the model
            const orders = await model.findAll();
            // Return the orders
            ctx.status = 200; // OK
            ctx.body = orders[0];
        } catch (error) {
            // Handle any errors
            ctx.status = 500; // Internal Server Error
            ctx.body = error.message;
        }
    }

    static async getOrderById(ctx) {

        const userId =ctx.state.user.id;
        console.log('IDID:', userId);
        const orderId = await model.findMostRecentOrderIdByUserId(userId);
    
            if (!orderId) {
                ctx.status = 404;
                ctx.body = { message: 'No orders found for the user' };
                return;
            }
         // Check if the authenticated user has permission to create an order
         const permission = await permissions.getOrderById(ctx.state.user);
         console.log('permission:', permission);
         if (!permission.granted) {
             ctx.status = 403;
             ctx.body = { message: "You do not have permission to create an order." };
             return;
         }
    
    
        try {
            // Retrieve the order by ID
            const order = await model.findById(orderId);
            console.log('order:', order);
            if (!order) {
                // If no order is found, return a 404 Not Found
                ctx.status = 404;
                ctx.body = { message: 'Order not found' };
                return;
            }
            ctx.status = 200; // OK
            ctx.body = order;

        } catch (error) {
            // Handle any errors
            ctx.status = 500; // Internal Server Error
            ctx.body = { message: error.message };
        }
    }
    

    static async updateOrder(ctx) {
        const userId = ctx.state.user.id;
        const orderId = await model.findMostRecentOrderIdByUserId(userId);
    
            if (!orderId) {
                ctx.status = 404;
                ctx.body = { message: 'No orders found for the user' };
                return;
            }
    
        const permission = permissions.updateOrder(ctx.state.user);
        if (!permission.granted) {
        ctx.status = 403;
        ctx.body = { message: "You do not have permission to get order." };
        return;
        }

        
        // Get the updated data from the request body
        const updateData = ctx.request.body;
        try {
            // Update the order in the database
            const updatedOrder = await model.updateById(orderId, updateData);
            // Return the updated order
            ctx.status = 200; // OK
            ctx.body = { Rows_affected : updatedOrder };
        } catch (error) {
            // Handle errors (e.g., not found, validation errors, etc.)
            ctx.status = error.status || 500; // Internal Server Error or specific error
            ctx.body = error.message;
        }
    }

    static async deleteOrder(ctx) {
        const userId = ctx.state.user.id; 
        try {
            // Find the most recent orderId for the user
            const orderId = await model.findMostRecentOrderIdByUserId(userId);
    
            if (!orderId) {
                ctx.status = 404;
                ctx.body = { message: 'No orders found for the user' };
                return;
            }
    
            // Check permissions, passing in the user and orderId for proper ACL check
            const permission = permissions.deleteOrder(ctx.state.user, userId);
    
            if (!permission.granted) {
                ctx.status = 403;
                ctx.body = { message: "You do not have permission to delete this order." };
                return;
            }
    
            // If permission is granted, delete the order
            const result = await model.deleteById(orderId);
            if (result.affectedRows === 0) {
                ctx.status = 404;
                ctx.body = { message: 'Order not found or already deleted' };
            } else {
                ctx.status = 200; // OK
                ctx.body = { message: 'Order deleted successfully' };
            }
        } catch (error) {
            ctx.status = 500;
            ctx.body = { error: error.message || 'Internal Server Error' };
        }
    }
    
}

module.exports = OrderController;
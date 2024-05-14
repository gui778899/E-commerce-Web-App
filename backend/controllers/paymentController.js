const db = require('../database/database');
const model = require('../models/payment');
const permissions = require('../permissions/payment');

class PaymentController {
    static async createPayment(ctx) {
        console.log(ctx.state.user);
        const permission = permissions.createUserPayment(ctx.state.user, ctx.state.user.id);
        if (!permission.granted) {
            ctx.status = 403;
            ctx.body = { message: "You do not have permission to create payment." };
            return;
        }
        try {
            const result = await model.createPayment(ctx.state.user.id);
            console.log('result:', result);
            if (result && result.affectedRows === 1) {
                ctx.status = 201; // Successfully created
                ctx.body = {
                    message: 'Payment created successfully',
                    paymentId: result.insertId // Using insertId directly from the result object
                };
            } else {
                ctx.status = 400; // Bad request
                ctx.body = { message: 'Payment could not be created' };
            }
        } catch (error) {
            ctx.status = 500; // Internal Server Error
            ctx.body = { message: error.message };
        }
    }
    
    
    
    

    static async getPaymentById(ctx) {
        const { id } = ctx.params;
        const permission = permissions.readUserPayment(ctx.state.user, ctx.state.user.id);
        if (!permission.granted) {
        ctx.status = 403;
        ctx.body = { message: "You do not have permission to get payment." };
        return;
        }
        try {
            const [payment] = await model.getPaymentById(id);
            if (payment) {
                ctx.status = 200;
                ctx.body = payment;
            } else {
                ctx.status = 404;
            }
        } catch (error) {
            ctx.status = 500;
            ctx.body = error;
        }
    }

    static async getAllPayments(ctx) {
        const permission = permissions.readAllPayments(ctx.state.user);
        if (!permission.granted) {
        ctx.status = 403;
        ctx.body = { message: "You do not have permission to get all payment." };
        return;
        }
        try {
            const [payments] = await model.getAllPayments();
            ctx.status = 200;
            ctx.body = payments;
        } catch (error) {
            ctx.status = 500;
            ctx.body = error;
        }
    }

    static async updatePaymentById(ctx) {
        const permission = permissions.updateUserPayment(ctx.state.user);
        if (!permission.granted) {
        ctx.status = 403;
        ctx.body = { message: "You do not have permission to update payment." };
        return;
        }
        const { id } = ctx.params;
        const paymentData = ctx.request.body;
    
        try {
            const result = await model.updatePaymentById(id, paymentData);
            
            if (result.affectedRows === 0) {
                // No rows were updated, which means the payment was not found
                ctx.status = 404;
                ctx.body = { message: 'Payment not found' };
            } else {
                // The payment was updated successfully
                ctx.status = 200;
                ctx.body = { message: 'Payment updated successfully' };
            }
        } catch (error) {
            ctx.status = 500;
            ctx.body = { message: error.message };
        }
    }
    

    static async deletePaymentById(ctx) {
        const permission = permissions.deleteUserPayment(ctx.state.user);
        if (!permission.granted) {
        ctx.status = 403;
        ctx.body = { message: "You do not have permission to delete payment." };
        return;
        }
        const { id } = ctx.params;
        try {
            const result = await model.deletePaymentById(id);
            if (result) {
                ctx.status = 200;
                ctx.body = 'Payment deleted successfully';
            } else {
                ctx.status = 404;
            }
        } catch (error) {
            ctx.status = 500;
            ctx.body = error;
        }
    }
}

module.exports = PaymentController;

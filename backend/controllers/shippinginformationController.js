const db = require('../database/database'); // Adjust the path to your actual database module
const model = require('../models/shippinginformation');
const permissions = require('../permissions/shippinginformation'); 

class ShippinginformationController {
    
    static async createShippingInformation(ctx) {
        const userId=ctx.state.user.id;
        //const permission = await permissions.canCreateShippingInformation(ctx.state.user,userId);
        //if (!permission.granted) {
        //ctx.status = 403;
        //ctx.body = { message: "You do not have permission to get order." };
        //return;
        //}
        const shippingData = ctx.request.body;
        try {
            const result = await model.createShippingInformation(userId);
            ctx.status = 201; // Created
            ctx.body = { message: 'Shipping information created successfully', shippingId: result.insertId };
        } catch (error) {
            ctx.status = 500; // Internal Server Error
            ctx.body = { message: error.message };
        }
    }

    static async getShippingInformationById(ctx) {
        const orderid=await model.findOrderIdByShippingId(ctx.params.id);
        const userid=await model.findUserIdByOrderId(orderid);
        const permission = await permissions.canReadShippingInformation(ctx.state.user,userid);
        if (!permission.granted) {
        ctx.status = 403;
        ctx.body = { message: "You do not have permission to get order." };
        return;
        }
        const { id } = ctx.params;
        try {
            const shippingInfo = await model.getShippingInformationById(id);
            if (shippingInfo) {
                ctx.status = 200; // OK
                ctx.body = shippingInfo;
            } else {
                ctx.status = 404; // Not Found
                ctx.body = { message: 'Shipping information not found' };
            }
        } catch (error) {
            ctx.status = 500; // Internal Server Error
            ctx.body = { message: error.message };
        }
    }

    static async getShippingInformationByOrderId(ctx) {
        const userid=await model.findUserIdByOrderId(ctx.params.orderId);
        const permission = await permissions.canReadShippingInformation(ctx.state.user,userid);
        if (!permission.granted) {
        ctx.status = 403;
        ctx.body = { message: "You do not have permission to get order." };
        return;
        }
        
        const { orderId } = ctx.params;
        try {
            const [shippingInfo] = await model.getShippingInformationByOrderId(orderId);
            if (shippingInfo) {
                ctx.status = 200; // OK
                ctx.body = shippingInfo;
            } else {
                ctx.status = 404; // Not Found
                ctx.body = { message: 'No shipping information found for the given order' };
            }
        } catch (error) {
            ctx.status = 500; // Internal Server Error
            ctx.body = { message: error.message };
        }
    }

    static async updateShippingInformationById(ctx) {
        const permission = await permissions.canUpdateShippingInformation(ctx.state.user);
        if (!permission.granted) {
        ctx.status = 403;
        ctx.body = { message: "You do not have permission to get order." };
        return;
        }
        const { id } = ctx.params;
        const shippingData = ctx.request.body;
        try {
            const result = await model.updateShippingInformationById(id, shippingData);
            if (result.affectedRows === 0) {
                ctx.status = 404; // Not Found
                ctx.body = { message: 'Shipping information not found' };
            } else {
                ctx.status = 200; // OK
                ctx.body = { message: 'Shipping information updated successfully' };
            }
        } catch (error) {
            ctx.status = 500; // Internal Server Error
            ctx.body = { message: error.message };
        }
    }

    static async deleteShippingInformationById(ctx) {
        const permission = await permissions.canDeleteShippingInformation(ctx.state.user);
        if (!permission.granted) {
        ctx.status = 403;
        ctx.body = { message: "You do not have permission to get order." };
        return;
        }
        const { id } = ctx.params;
        try {
            const result = await model.deleteShippingInformationById(id);
            if (result.affectedRows === 0) {
                ctx.status = 404; // Not Found
                ctx.body = { message: 'Shipping information not found' };
            } else {
                ctx.status = 200; // OK
                ctx.body = { message: 'Shipping information deleted successfully' };
            }
        } catch (error) {
            ctx.status = 500; // Internal Server Error
            ctx.body = { message: error.message };
        }
    }
}

module.exports = ShippinginformationController
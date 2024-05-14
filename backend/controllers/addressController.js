const db = require('../database/database'); // Your database module
const model = require('../models/address');
const userController = require('../controllers/userController');

const permissions = require('../permissions/address'); 

class AddressController {
    static async createAddress(ctx) {
        const userID = ctx.state.user.id;
        const addressData = ctx.request.body;

        const permission = permissions.createAddress(ctx.state.user);
        console.log(permission);

        if (!permission.granted) {
            ctx.status = 403; // Forbidden
            ctx.body = { message: "You do not have permission to create an address." };
            return;
        }

        try {
            const result = await model.createAddress(userID, addressData);
            ctx.status = 201; // Created
            ctx.body = { message: 'Address created successfully', addressId: result.insertId };
        } catch (error) {
            ctx.status = 500; // Internal Server Error
            ctx.body = { message: error.message };
        }
    }


    static async getAddressById(ctx) {
        const { id } = ctx.params;
        try {
            const address = await model.getAddressById(id);
            const permission = permissions.readAddress(ctx.state.user, address);

            if (!permission.granted) {
                ctx.status = 403; // Forbidden
                ctx.body = { message: "You do not have permission to view this address." };
                return;
            }

            if (address) {
                ctx.status = 200; // OK
                ctx.body = address;
            } else {
                ctx.status = 404; // Not Found
                ctx.body = { message: 'Address not found' };
            }
        } catch (error) {
            ctx.status = 500; // Internal Server Error
            ctx.body = { message: error.message };
        }
    }

    static async getAddressesByUserId(ctx) {;
        console.log(ctx.params);
        console.log(ctx.state.user);
        // Convert the UserID string from params to an integer
        const userIdFromParams = parseInt(ctx.state.user.id, 10);
        console.log({ UserID: ctx.state.user.id });

        // Now you can compare them as both will be integers
        const permission = permissions.readAddress(ctx.state.user, { UserID:ctx.state.user.id });

        if (!permission.granted) {
            ctx.status = 403; // Forbidden
            ctx.body = { message: "You do not have permission to view these addresses." };
            return;
        }

        try {
            const addresses = await model.getAddressesByUserId(ctx.state.user.id);
            console.log(addresses); 
            ctx.status = 200; // OK
            ctx.body = addresses;
        } catch (error) {
            ctx.status = 500; // Internal Server Error
            ctx.body = { message: error.message };
        }
    }

    static async updateAddressById(ctx) {


        const { id } = ctx.params;
        const Id_to_update = id;
        const addressData = ctx.request.body;
        const address = await model.getAddressById(Id_to_update);
        if (!address) {
            ctx.status = 404; // Not Found
            ctx.body = { message: 'Address not found' };
            return;
        }    
        const permission = permissions.updateAddress(ctx.state.user, { UserID: address.UserID });

        


        if (!permission.granted) {
            ctx.status = 403; // Forbidden
            ctx.body = { message: "You do not have permission to update this address." };
            return;
        }

        try {
            const [result] = await model.updateAddressById(id, addressData);
            if (result.affectedRows === 0) {
                ctx.status = 404; // Not Found
                ctx.body = { message: 'Address not found' };
            } else {
                ctx.status = 200; // OK
                ctx.body = { message: 'Address updated successfully' };
            }
        } catch (error) {
            ctx.status = 500; // Internal Server Error
            ctx.body = { message: error.message };
        }
    }

    static async deleteAddressById(ctx) {
        const { id } = ctx.params;
        const Id_to_delete = id;
        const address = await model.getAddressById(Id_to_delete);
        if (!address) {
            ctx.status = 404; // Not Found
            ctx.body = { message: 'Address not found' };
            return;
        }    
        const permission = permissions.deleteAddress(ctx.state.user, { UserID: address.UserID });

        if (!permission.granted) {
            ctx.status = 403; // Forbidden
            ctx.body = { message: "You do not have permission to delete this address." };
            return;
        }

        try {
            const result = await model.deleteAddressById(Id_to_delete);
            if (result.affectedRows === 0) {
                ctx.status = 404; // Not Found
                ctx.body = { message: 'Address not found' };
            } else {
                ctx.status = 200; // OK
                ctx.body = { message: 'Address deleted successfully' };
            }
        } catch (error) {
            ctx.status = 500; // Internal Server Error
            ctx.body = { message: error.message };
        }
    }
}

module.exports = AddressController;

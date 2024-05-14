const db = require('../database/database'); // Adjust the path to your actual database module
const model = require('../models/roles');
const permissions = require('../permissions/roles'); 

class RolesController {
    static async all(ctx) {
      console.log(ctx.state.user);
      const permission = permissions.readRoles(ctx.state.user);
      if (!permission.granted) {
        ctx.status = 403;
        ctx.body = { message: "You do not have permission to view roles." };
        return;
      }
      try {
        const roles = await model.getAllRoles();
        ctx.body = roles[0];
      } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Internal Server Error' };
      }
    }
  
    static async getbyName(ctx) {
      const permission = permissions.readRoles(ctx.state.user);
      if (!permission.granted) {
        ctx.status = 403;
        ctx.body = { message: "You do not have permission to view roles." };
        return;
      }
      try {
        const { name } = ctx.params;
        const role = await model.getRoleByName(name);
        if (role.length === 0) {
          ctx.status = 404;
          ctx.body = { error: 'Role not found' };
          return;
        }
        ctx.body = role[0];
      } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Internal Server Error' };
      }
    }
  
    static async newrole(ctx) {
      const permission = permissions.createRole(ctx.state.user);
      if (!permission.granted) {
        ctx.status = 403;
        ctx.body = { message: "You do not have permission to view roles." };
        return;
      }
      try {
        const { name, description } = ctx.request.body;
        const result = await model.createRole(name, description);
        ctx.status = 201; // Resource created
        ctx.body = { message: 'New role created', id: result.insertId };
      } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Internal Server Error' };
      }
    }
  
    static async update(ctx) {
      const permission = permissions.updateRole(ctx.state.user);
      if (!permission.granted) {
        ctx.status = 403;
        ctx.body = { message: "You do not have permission to view roles." };
        return;
      }
      try {
        const { name } = ctx.params;
        const { description } = ctx.request.body;
        const result = await model.updateRole(name, description);
        if (result.affectedRows === 0) {
          ctx.status = 404;
          ctx.body = { error: 'Role not found' };
          return;
        }
        ctx.body = { message: 'Role updated successfully' };
      } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Internal Server Error' };
      }
    }
  
    static async delete(ctx) {
      const permission = permissions.deleteRole(ctx.state.user);
      if (!permission.granted) {
        ctx.status = 403;
        ctx.body = { message: "You do not have permission to view roles." };
        return;
      }
        try {
          const { name } = ctx.params;
          const result = await model.deleteRole(name);
          if (result.affectedRows === 0) {
            ctx.status = 404;
            ctx.body = { error: 'Role not found' };
            return;
          }
          ctx.status = 200; // Use 200 OK to send a response body
          ctx.body = { message: 'Role deleted successfully' };
        } catch (error) {
          ctx.status = 500;
          ctx.body = { error: 'Internal Server Error' };
        }
    }
      
  }
  
  module.exports = RolesController;

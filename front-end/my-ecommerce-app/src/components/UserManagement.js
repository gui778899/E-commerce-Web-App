import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserManagement.css';

function UserManagement() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/user'); // Make sure to handle JWT token as needed
        if (response.data && Array.isArray(response.data[0])) {
          setUsers(response.data[0]); // Assuming the first element is the array of user objects
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      if (window.confirm('Are you sure you want to delete this user?')) {
        const response = await axios.delete(`/user/${userId}`, {
          withCredentials: true
        });
        if (response.status === 200 || response.status === 204) {
          console.log('User deleted successfully:', userId);
          setUsers(users.filter(user => user.UserID !== userId));
        } else {
          console.error('Failed to delete user:', response.data);
        }
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="user-management-container">
      <h1>User Management</h1>
      <span className="material-symbols-outlined back" onClick={() => navigate('/admin-dashboard')}>
        arrow_back
      </span>
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.UserID}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleDelete(user.UserID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({ Name: '', Description: '', Price: '', StockQuantity: '' });
  const [addingNewProduct, setAddingNewProduct] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/product');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product.ProductID);
    setEditFormData(product);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/product/${editingProduct}`, editFormData);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/product/${productId}`);
      fetchProducts(); // Refresh the product list after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  const handleSignOut = async () => {
    try {
      await axios.post('/user/logout');
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  const handleManageClick = () => {
    navigate('/user-management');
  };

  const handleAddNewClick = () => {
    setAddingNewProduct(true);
    setEditFormData({ Name: '', Description: '', Price: '', StockQuantity: '' }); // Reset form data for new product
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/product', editFormData);
      setAddingNewProduct(false);
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <button type="submit" className="logout-button" onClick={handleSignOut}>
        Sign Out
      </button>
      <span className="material-symbols-outlined manage" onClick={handleManageClick}>
        manage_accounts
      </span>
      <span className="material-symbols-outlined add" onClick={handleAddNewClick}>add</span>

      <div className="dashboard-content">
        <h1 className="dashboard-header">Admin Product Dashboard</h1>
        {addingNewProduct ? (
          <form onSubmit={handleAddProduct} className="add-product-form">
            <input type="text" name="Name" placeholder="Name" value={editFormData.Name} onChange={handleFormChange} required />
            <input type="text" name="Description" placeholder="Description" value={editFormData.Description} onChange={handleFormChange} required />
            <input type="text" name="Price" placeholder="Price" value={editFormData.Price} onChange={handleFormChange} required />
            <input type="number" name="StockQuantity" placeholder="Stock Quantity" value={editFormData.StockQuantity} onChange={handleFormChange} required />
            <button type="submit">Add Product</button>
            <button type="button" onClick={() => setAddingNewProduct(false)}>Cancel</button>
          </form>
        ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.ProductID}>
                <td>{product.Name}</td>
                <td>{product.Description}</td>
                <td>{product.Price}</td>
                <td>{product.StockQuantity}</td>
                <td>
                  {editingProduct === product.ProductID ? (
                    <form onSubmit={handleUpdate}>
                      <input type="text" name="Name" value={editFormData.Name} onChange={handleFormChange} />
                      <input type="text" name="Description" value={editFormData.Description} onChange={handleFormChange} />
                      <input type="text" name="Price" value={editFormData.Price} onChange={handleFormChange} />
                      <input type="number" name="StockQuantity" value={editFormData.StockQuantity} onChange={handleFormChange} />
                      <button type="submit">Save</button>
                      <button type="button" onClick={handleCancel}>Cancel</button>
                    </form>
                  ) : (
                    <button onClick={() => handleEdit(product)}>Edit</button>
                  )}
                </td>
                <td>
                  <button onClick={() => handleDelete(product.ProductID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

function ProfilePage() {
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState({
        AddressLine1: '',
        City: '',
        State: '',
        PostalCode: '',
        Country: ''
    });
    const [showAddAddress, setShowAddAddress] = useState(false);

    useEffect(() => {
        if (!showAddAddress) {
            // Fetch addresses only when not showing the add address form
            const fetchAddresses = async () => {
                try {
                    const response = await axios.get('/address/', { withCredentials: true });
                    setAddresses(response.data);
                } catch (error) {
                    console.error('Error fetching addresses:', error);
                }
            };
            fetchAddresses();
        }
    }, [showAddAddress]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    

    const handleAddAddress = async () => {
        try {
            const response = await axios.post('/address/', newAddress, { withCredentials: true });
            console.log('Address added successfully:', response.data);
            setShowAddAddress(false); // Close the add address form
        } catch (error) {
            console.error('Error adding address:', error);
        }
    };

    const handleGoBack = () => {
        setShowAddAddress(false); // Hide the add address form
    };

    const handleDeleteAddress = async (addressId) => {
        try {
            await axios.delete(`/address/${addressId}`, { withCredentials: true });
            console.log('Address deleted successfully');
            // Update the address list after deletion
            setAddresses(addresses.filter(address => address.AddressID !== addressId));
        } catch (error) {
            console.error('Error deleting address:', error);
        }
    };

    if (showAddAddress) {
        return (
            <div className="add-address-container">
<span className="material-symbols-outlined back-to-main" onClick={handleGoBack}>
                    arrow_back
                </span>
                <h1>Add New Address</h1>
                <div className="add-address-form">
                    <input
                        type="text"
                        name="AddressLine1"
                        value={newAddress.AddressLine1}
                        onChange={handleInputChange}
                        placeholder="Address"
                    />
                    <input
                        type="text"
                        name="City"
                        value={newAddress.City}
                        onChange={handleInputChange}
                        placeholder="City"
                    />
                    <input
                        type="text"
                        name="State"
                        value={newAddress.State}
                        onChange={handleInputChange}
                        placeholder="State"
                    />
                    <input
                        type="text"
                        name="PostalCode"
                        value={newAddress.PostalCode}
                        onChange={handleInputChange}
                        placeholder="Postal Code"
                    />
                    <input
                        type="text"
                        name="Country"
                        value={newAddress.Country}
                        onChange={handleInputChange}
                        placeholder="Country"
                    />
                    <button className="profile-button" onClick={handleAddAddress}>Confirm Add</button>
                    <button className="profile-button" onClick={() => setShowAddAddress(false)}>Cancel</button>
                </div>
            </div>
        );
    }

    return (
        
        <div className="profile-container">
      <span className="material-symbols-outlined back-to-main" onClick={() => navigate(-1)}>
        arrow_back
      </span>
            <h1>User Profile</h1>
            <p>If you want to add an address, click the button below.</p>
            <button className="profile-button" onClick={() => setShowAddAddress(true)}>Add Address</button>
            {showAddAddress && (
                <div className="add-address-form">
                    <input type="text" name="AddressLine1" value={newAddress.address} onChange={(e) => handleInputChange(e, setNewAddress)} placeholder="Address" />
                    <input type="text" name="City" value={newAddress.city} onChange={(e) => handleInputChange(e, setNewAddress)} placeholder="City" />
                    <input type="text" name="State" value={newAddress.state} onChange={(e) => handleInputChange(e, setNewAddress)} placeholder="State" />
                    <input type="text" name="PostalCode" value={newAddress.postalCode} onChange={(e) => handleInputChange(e, setNewAddress)} placeholder="Postal Code" />
                    <input type="text" name="Country" value={newAddress.country} onChange={(e) => handleInputChange(e, setNewAddress)} placeholder="Country" />
                    <button className="profile-button" onClick={handleAddAddress}>Confirm Add</button>
                </div>
            )}
             <h2>These are your current addresses:</h2>
            <ul className="addresses-list">
            {addresses.length > 0 ? (
                addresses.map((address) => (
                    <li key={address.AddressID}>
                        <p>Address: {address.AddressLine1}</p>
                        <p>City: {address.City}</p>
                        <p>State: {address.State}</p>
                        <p>Postal Code: {address.PostalCode}</p>
                        <p>Country: {address.Country}</p>
                        <button className="profile-button" onClick={() => handleDeleteAddress(address.AddressID)}>Remove Address</button>
                    </li>
                ))
            ) : (
                <p>No addresses found.</p>
            )}
            </ul>
        </div>
    );
}

export default ProfilePage;

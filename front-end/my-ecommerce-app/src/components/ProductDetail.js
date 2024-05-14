// ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
        try {
            // Make sure withCredentials is true to send the httpOnly cookie
            const response = await axios.get(`/product/${productId}`, {
                withCredentials: true
            });
            setProduct(response.data.data);
        } catch (error) {
            console.error('Error fetching product detail:', error);
        }
    };
    fetchProductDetail();
}, [productId]);

  

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <h2>{product.Name}</h2>
      <p>{product.Description}</p>
      <p>Price: {product.Price} </p>
      {/* Add more product details that you'd like to show */}
    </div>
  );
}

export default ProductDetail;

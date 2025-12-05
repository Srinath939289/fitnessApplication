import React, { useState, useEffect } from "react";
import { getProducts } from "../api/products";

import { useCart } from "../context/CartContext";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error loading products: {error}</div>;

  return (
    <div className="shop-container">
      <h2>Fitness Shop</h2>
      <div className="products-section">
        <h3>Products</h3>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p className="price">Price: Rs. {product.price}</p>
              <p className="stock">Stock: {product.stock}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
